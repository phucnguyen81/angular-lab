import { Component } from '@angular/core';

import { ProfileForm } from './profile-form.control';

@Component({
  selector: 'my-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css', './forms.css']
})
export class ProfileEditorComponent {

  profileForm = new ProfileForm();

  // Example of partial update on form value
  updateProfile(): void {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  onSubmit(): void {
    // TODO: submit form to api.service
    console.warn(this.profileForm.value);
  }

}
