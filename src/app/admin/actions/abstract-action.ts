import { ViewContextService } from '../services/view-context.service';

export abstract class AbstractAction implements BasicTableAction {
  public icon: string;
  public title: string;
  protected ctxService: ViewContextService;
  constructor(ctxService: ViewContextService, icon: string, title: string) {
    this.ctxService = ctxService;
    this.icon = icon;
    this.title = title;
  }

  public abstract apply(): void;
  public abstract apply(value?: any): void;
}

export interface BasicTableAction {
  icon: string;
  title: string;
  apply(): void;
  apply(value?: any): void;
}
