import { EventEmitter, Injectable } from '@angular/core';
import { RowContext, TableContext } from '../models/ui-contexts';

@Injectable()
export class ViewContextService {
  private tableContext!: TableContext;
  private contextChangeEvent = new EventEmitter<TableContext>();
  constructor() {}

  public setTableContext(ctx: TableContext, emitEvent?: boolean): void {
    this.tableContext = ctx;
    if (emitEvent === true) {
      this.contextChangeEvent.emit(this.tableContext);
    }
  }

  public getTableContext(): TableContext {
    return this.tableContext;
  }

  getRowContext(row: any): RowContext {
    return { ...this.tableContext, row: row };
  }

  public contextChanges() {
    return this.contextChangeEvent;
  }
}
