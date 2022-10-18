import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../services/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-dailogue',
  templateUrl: './dailogue.component.html',
  styleUrls: ['./dailogue.component.css']
})
export class DailogueComponent implements OnInit {
  productForm !: FormGroup;
  actionBtn : string = "save";
  constructor(private formBuilder : FormBuilder, 
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef: MatDialogRef<DailogueComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      idName: ['',Validators.required],
      title: ['',Validators.required],
      desc: ['',Validators.required],
    });
    if(this.editData){
      this.actionBtn="Updated"
      this.productForm.controls['idName'].setValue(this.editData.idName);
      this.productForm.controls['title'].setValue(this.editData.title);
      this.productForm.controls['desc'].setValue(this.editData.desc);

    }




  }
addProduct(){
if(!this.editData){
  if(this.productForm.valid){
    this.api.postProduct(this.productForm.value)
    .subscribe({
      next:(res)=>{
        alert('issue added successfully');
        this.productForm.reset();
        this.dialogRef.close("Saved");
      },
      error:()=>{
        alert('error datas')
      }
    })
  }
}else{
  this.updateProduct()
}
}
updateProduct(){
  this.api.putProduct(this.productForm.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("product updated sucessfully")
      this.productForm.reset();
      this.dialogRef.close('update');
    }
  })
}
}
