import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MessageValidator } from '../classes/validators/message-validator';
import { PasswordValidator } from '../classes/validators/password-validator';
import { UsernameValidator } from '../classes/validators/username-validator';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  createLoginForm(): FormGroup { 
    return new FormBuilder().group({
      name: new UsernameValidator(),
      password: new PasswordValidator(),
    });
  }

  createRegistrationForm(): FormGroup {
    return new FormBuilder().group({
      name: new UsernameValidator(),
			password: new PasswordValidator(),
    });
  }

  createMessageForm(): FormGroup {
    return new FormBuilder().group({
			message: new MessageValidator(),
		});
  }


}
