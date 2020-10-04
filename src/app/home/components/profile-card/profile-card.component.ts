import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  @Input() employee: Employee;
  public isRatingVisible: boolean;

  constructor(private empService: EmployeeService) { }

  ngOnInit(): void {
    this.isRatingVisible = this.canSeeRating(this.employee);
  }

  canSeeRating(employee): boolean {
    return this.empService.canSeeRating(employee);
  }

}
