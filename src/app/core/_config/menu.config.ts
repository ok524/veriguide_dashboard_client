export class MenuConfig {
  public defaults: any = {
    header: {
      self: {},
      items: [
        {
          title: 'Dashboards',
          root: true,
          alignment: 'left',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
        },
        {
          title: 'Document Stat',
          root: true,
          alignment: 'left',
          page: '/document-stat',
          translate: 'MENU.DOCUMENT_STAT',
        },
        {
          title: 'Document Trend',
          root: true,
          alignment: 'left',
          page: '/document-trend',
          translate: 'MENU.DOCUMENT_TREND',
        },
        {
          title: 'Document Fyp',
          root: true,
          alignment: 'left',
          page: '/document-fyp',
          translate: 'MENU.DOCUMENT_FYP',
        },
      ]
    },
    aside: {
      self: {},
      items: [
        {
          title: 'Dashboard',
          root: true,
          icon: 'flaticon2-architecture-and-city',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
          bullet: 'dot',
        },
        {
          title: 'Document Stat',
          root: true,
          icon: 'flaticon2-architecture-and-city',
          page: '/document-stat',
          translate: 'MENU.DOCUMENT_STAT',
          bullet: 'dot',
        },
        {
          title: 'Document Fyp',
          root: true,
          icon: 'flaticon2-architecture-and-city',
          page: '/document-fyp',
          translate: 'MENU.DOCUMENT_FYP',
          bullet: 'dot',
        },
        {
          title: 'Layout Builder',
          root: true,
          icon: 'flaticon2-expand',
          page: '/builder'
        },
      ]
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
