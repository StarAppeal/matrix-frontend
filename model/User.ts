export default class User {
  constructor(
      public name: string,
      public uuid: string,
      public id: string,
      public config : UserConfig
  ) {}
}

export class UserConfig {
  constructor(
      public isVisible: boolean ,
      public canBeModified: boolean,
      public isAdmin: boolean
  ) {}
}
