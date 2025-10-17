import {Routes} from '@angular/router';
import {Member} from './member/member';
import {Landing} from './landing/landing';
import {Pricing} from './pricing/pricing';
import {environment} from 'environment';
import {MemberLogin} from './auth/member-login/member-login';
import {PricingLogin} from './auth/pricing-login/pricing-login';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: `${environment.routes.landing}`, pathMatch: 'full'},
  {
    path: environment.routes.landing,
    component: Landing, title: 'Landing'
  },
  {
    path: environment.routes.pricing,
    component: Pricing, title: 'Pricing'
  },
  {
    path: environment.routes.member,
    component: Member, title: 'Member'
  },
  {
    path: environment.routes.memberLogin,
    component: MemberLogin, title: 'Member Login'
  },
  {
    path: environment.routes.pricingLogin,
    component: PricingLogin, title: 'Pricing Login'
  },
];
