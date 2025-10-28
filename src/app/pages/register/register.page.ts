import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  email = '';
  password = '';

  private app = initializeApp(environment.firebase);
  private auth = getAuth(this.app);
  private db = getDatabase(this.app);

  async register() {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );

      const userId = userCredential.user.uid;

      await set(ref(this.db, 'users/' + userId), {
        email: this.email,
      });

      alert('Usuario registrado correctamente');
    } catch (error: any) {
      console.error(error);
      alert('Error al registrar usuario: ' + error.message);
    }
  }
}
