import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { LevelsModule } from './levels/levels.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DivisionsModule } from './divisions/divisions.module';
import { StudentsModule } from './students/students.module';
import { DateScalar } from './common/scalar/date.scalar';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/entity/employee.entity';
import { ProjectModule } from './project/project.module';
import { ArchiveModule } from './archive/archive.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2311918',
      // password: 'metal+158',
      database: 'schools-system',
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        orphanedTypes: [Employee],
        numberScalarMode: 'integer',
      },
    }),
    LevelsModule,
    DivisionsModule,
    StudentsModule,
    EmployeeModule,
    ProjectModule,
    ArchiveModule,
  ],
  providers: [DateScalar],
})
export class AppModule {}
