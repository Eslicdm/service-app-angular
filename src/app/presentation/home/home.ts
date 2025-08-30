import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MemberList} from '../components/member-list/member-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    MemberList
  ],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {

}
