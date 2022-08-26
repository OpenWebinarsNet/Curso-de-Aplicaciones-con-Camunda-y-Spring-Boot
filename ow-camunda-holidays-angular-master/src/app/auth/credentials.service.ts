import { Injectable } from '@angular/core';
import { User } from '@app/models/user';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
}

const userInfoKey = 'user';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  constructor() {
    const savedUserInfo = sessionStorage.getItem(userInfoKey) || localStorage.getItem(userInfoKey);
    if (savedUserInfo) {
      this._userInfo = JSON.parse(savedUserInfo);
    }
  }

  private _userInfo: User = new User();

  /**
   * Gets the user info.
   * @return The user info or null if the user is not authenticated.
   */
  get userInfo(): User {
    return this._userInfo;
  }
}
