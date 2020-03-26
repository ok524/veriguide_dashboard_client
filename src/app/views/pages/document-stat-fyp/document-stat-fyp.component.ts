import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { UserData, DocData, DocumentStatFypService } from '../../../core/_base/layout/services/document-stat-fyp.service';

import { FormControl, FormGroupDirective, NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material';

@Component({
  selector: 'kt-document-stat-fyp',
  templateUrl: './document-stat-fyp.component.html',
  styleUrls: ['./document-stat-fyp.component.scss']
})
export class DocumentStatFypComponent {
  uuid: string;
  userData: UserData;
  docData: DocData;
  docDataResult: Array<{
    [key: string]: string | number
  }>;
  error: any;

  submission_id: string;
  user_id: string;
  onChange: Function;
  file: File | null = null;

  uploadForm = new FormGroup({
    submission_id: new FormControl(''),
    user_id: new FormControl(''),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(
    private documentStatFypService: DocumentStatFypService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    // this.submissionId = this.route.snapshot.params['submissionId'];
    this.route.params.subscribe( params => {
      // this.submissionId = params['submissionId'];
      this.uuid = params['uuid'];
      this.showDocData(this.uuid);
    });
    this.showUserData();
  }

  get f(){
    return this.uploadForm.controls;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.patchValue({
        fileSource: file
      });
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('submission_id', this.uploadForm.get('submission_id').value);
    formData.append('user_id', this.uploadForm.get('user_id').value);
    formData.append('file', this.uploadForm.get('fileSource').value);

    this.documentStatFypService.putDocData(formData)
      .subscribe(
        (data: any) => {
          console.log(data);
        }, // success path
        error => this.error = error // error path
      );
  }

  showDocData(uuid :string) {
    if (uuid !== "") {
      this.documentStatFypService.getDocData(uuid, "-10000001")
        .subscribe(
          (data: DocData) => this.docDataResult = data["result"], // success path
          error => this.error = error // error path
        );
    } else {
      console.warn(`uuid is not specified for show doc data.`)
    }
  }

  showUserData() {
    this.documentStatFypService.getUserData("23456")
      .subscribe(
        (data: UserData) => this.userData = {
          ...data
        }, // success path
        error => this.error = error // error path
      );
  }
}
