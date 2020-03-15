import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-control',
  templateUrl: './create-control.component.html',
  styles: []
})
export class CreateControlComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      peso: new FormControl(null, {
          validators: [Validators.required, Validators.min(0)]
      }),
      estatura: new FormControl(null, {
          validators: [Validators.required, Validators.min(0)]
      }),
      grasaCorporal: new FormControl(null, {
        validators: [Validators.required, Validators.min(0)]
      }),
    });
  }

  guardarAtleta() {
  
    console.log(this.form);
    //this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    
    //this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);
    
    this.form.reset();
  }

}
