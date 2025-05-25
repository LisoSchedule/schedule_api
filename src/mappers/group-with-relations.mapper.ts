import { CurrentUserDto } from "../dtos/current-user.dto";
import { GroupWithRelationsDto } from "../dtos/group-with-relations.dto";
import { GroupWithRelations } from "../types/group-with-relations.type";

export class GroupWithRelationsMapper {
  toDto(groupWithRelations: GroupWithRelations): GroupWithRelationsDto {
    return {
      id: groupWithRelations.id,
      name: groupWithRelations.name,
      subGroup: groupWithRelations.subGroup,
      createdAt: groupWithRelations.createdAt,
      updatedAt: groupWithRelations.updatedAt,
      users: groupWithRelations.users.map((user) => new CurrentUserDto(user)),
      lessons: groupWithRelations.lessons,
    };
  }
}
