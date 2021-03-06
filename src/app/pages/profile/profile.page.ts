import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: any;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  isDisabled() {
    return !this.authService.isEnabled();
  }

  authenticated() {
    return this.profile;
  }

  login() {
    this.authService.login().then(() => {
      this.loadUserProfile();
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.profile = undefined;
    });
  }

  loadUserProfile() {
    this.authService.getProfile().then((userProfile: any) => {
      const realmRoles = this.authService.auth.getRealmRoles();

      this.profile = {
        username: userProfile.username ? userProfile.username : 'Unknown Username',
        firstName: userProfile.firstName ? userProfile.firstName : 'Unknown First Name',
        lastName: userProfile.lastName ? userProfile.lastName : 'Unknown Last Name',
        id: userProfile.id ? userProfile.id : 'Unknown User ID',
        email: userProfile.email,
        totp: userProfile.totp ? userProfile.totp : false,
        emailVerified: userProfile.emailVerified ? userProfile.emailVerified : false,
        realmRoles,
      };
    })
      .catch((err) => console.error('Error retrieving user profile', err));
  }

  public ionViewDidEnter(): void {
    this.loadUserProfile();
  }
}
