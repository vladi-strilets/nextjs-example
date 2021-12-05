import { EntityValidationPipe } from 'src/api/shared/pipes/entity.pipe';
import { Room } from '../entities/room.entity';

export const RoomValidationPipe = new EntityValidationPipe(Room);
