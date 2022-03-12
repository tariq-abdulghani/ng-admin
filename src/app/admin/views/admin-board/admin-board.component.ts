import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EntityViewsConfig } from '../../models/entity';
import { EntityViewsRegisterer } from '../../services/entity-registerer';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css'],
})
export class AdminBoardComponent implements OnInit {
  constructor(
    public entityRegisterer: EntityViewsRegisterer,
    private router: Router
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<EntityViewsConfig>;
  displayedColumns = ['label', 'description', 'view'];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      this.entityRegisterer.listEntities()
    );
    this.dataSource.paginator = this.paginator;
    console.log(this.entityRegisterer.listEntities());
  }

  onView(el: EntityViewsConfig) {
    this.router.navigate([`admin`, el.label]);
  }
}
