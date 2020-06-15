import { Component, OnInit } from '@angular/core';

import { Profile }    from '../profile';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
  profiles: Profile[];
  error = '';
  success = '';

  profile = new Profile('', '', '', '');

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
  }

  saveProfile(f) {
    this.resetErrors();

    this.profileService.save(this.profile)
      .subscribe(
        (res: Profile[]) => {
          // Update the list of profiles
          this.profiles = res;

          // Inform the user
          this.success = 'Profile saved successfully';

          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );
  }

  private resetErrors(){
    this.success = '';
    this.error   = '';
  }
}
