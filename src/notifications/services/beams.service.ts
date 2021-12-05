import { Injectable } from '@nestjs/common';
import { beamsClient } from 'src/integrations/beams.integration';
import { ProjectCreatedEvent } from 'src/triggers/events/projects.event';
import { SendBeamData } from '../interface/send-beam-data.interface';

@Injectable()
export class BeamsService {
  async beamProjectCreated(
    proIds: string[],
    projectCreatedData: ProjectCreatedEvent,
  ): Promise<void> {
    const { title, city, category } = projectCreatedData.project;

    const sendBeamData: SendBeamData = {
      users: proIds,
      title: 'New Project',
      body: `New project of category ${category.title} in ${city.title} available: ${title}`,
    };

    await this.sendBeam(sendBeamData);
  }

  private async sendBeam(dto: SendBeamData): Promise<void> {
    const { users, title, body, deepLink: deep_link } = dto;
    await beamsClient.publishToUsers(users, {
      web: { notification: { title, body, deep_link } },
    });
  }
}
