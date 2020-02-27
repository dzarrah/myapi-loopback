import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Employee, EmployeeRelations, Department} from '../models';
import {DebeDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DepartmentRepository} from './department.repository';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {

  public readonly department: BelongsToAccessor<Department, typeof Employee.prototype.id>;

  constructor(
    @inject('datasources.debe') dataSource: DebeDataSource, @repository.getter('DepartmentRepository') protected departmentRepositoryGetter: Getter<DepartmentRepository>,
  ) {
    super(Employee, dataSource);
    this.department = this.createBelongsToAccessorFor('department', departmentRepositoryGetter,);
    this.registerInclusionResolver('department', this.department.inclusionResolver);
  }
}
