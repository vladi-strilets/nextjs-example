import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from 'src/api/users/entities/user.entity';
import { USER_ROLE } from 'src/api/users/types/user-roles.type';
import { BeamsService } from 'src/notifications/services/beams.service';
import { ProjectCreatedEvent } from '../events/projects.event';
import { EventType } from '../types/event.types';

@Injectable()
export class ProjectListener {
  constructor(private beamsService: BeamsService) {}

  @OnEvent(EventType.PROJECT_CREATED, { async: true })
  async handleProjectCreatedEvent(projectCreatedData: ProjectCreatedEvent) {
    const { city, category } = projectCreatedData.project;

    const pros = await User.createQueryBuilder('user')
      .leftJoin('user.proProfile', 'pro')
      .leftJoin('pro.provinces', 'province')
      .leftJoin('province.cities', 'city')
      .leftJoin('pro.categories', 'category')
      .where('user.role = :userRole', { userRole: USER_ROLE.PRO })
      .andWhere('city.id = :cityId', { cityId: city.id })
      .andWhere('category.id = :categoryId', { categoryId: category.id })
      .getMany();

    if (pros.length === 0) {
      console.log('No pros were found');
      return;
    }

    const proIds = pros.map((pro) => pro.id);

    await this.beamsService.beamProjectCreated(proIds, projectCreatedData);
  }
}
