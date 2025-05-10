import {
  PrismaClient,
  UserStep,
  SubGroup,
  GroupName,
  DayOfWeek,
  RepeatType,
  SubjectType,
} from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    const group = await prisma.group.create({
      data: {
        subGroup: SubGroup.Group_2,
        name: GroupName.ComputerScience_31,
      },
    });

    console.log(`Created group: ${group.name} with ID: ${group.id}`);

    const user = await prisma.user.create({
      data: {
        chatId: 123456789,
        username: "wastardy",
        nickname: "Andrew",
        groupId: group.id,
        step: UserStep.MainMenu,
      },
    });

    console.log(`Created user with ID: ${user.id}`);

    const startOfFirstWeek = new Date("2024-09-02T08:30:00Z"); // Monday of the first week of the semester
    const startOfSecondWeek = new Date("2024-09-09T08:30:00Z"); // Monday of the second week of the semester

    const subjects = [
      //#region  Monday
      {
        name: "Хмарні технології",
        type: SubjectType.Practice,
        audience: "Ауд. 36",
        teacher: "Івасюк Руслан Васильович",
        repeat_type: RepeatType.EveryWeek,
        start_date: new Date(startOfFirstWeek.getTime()),
        start_time: new Date("2024-09-02T12:10:00Z"),
        end_time: new Date("2024-09-02T13:45:00Z"),
        days_of_week: [DayOfWeek.Monday],
      },
      {
        name: "Вебтехнології та вебдизайн",
        type: SubjectType.Practice,
        audience: "Ауд. 4",
        teacher: "Карашецький Володимир Петрович",
        description: "Лабораторна робота з вебтехнологій та вебдизайну",
        repeat_type: RepeatType.EveryWeek,
        start_date: new Date(startOfFirstWeek.getTime()),
        start_time: new Date("2024-09-02T14:30:00Z"),
        end_time: new Date("2024-09-02T16:05:00Z"),
        days_of_week: [DayOfWeek.Monday],
      },
      //#endregion

      //#region  Tuesday
      {
        name: "Технології захисту інформації",
        type: SubjectType.Lecture,
        audience: "Ауд. 46",
        teacher: "Грицюк Юрій Іванович",
        description: "Лекція з технологій захисту інформації",
        repeat_type: RepeatType.EveryWeek,
        start_date: new Date(startOfFirstWeek.getTime()),
        start_time: new Date("2024-09-03T08:30:00Z"),
        end_time: new Date("2024-09-03T10:05:00Z"),
        days_of_week: [DayOfWeek.Tuesday],
      },
      {
        name: "Програмування мобільних систем під Android",
        type: SubjectType.Practice,
        audience: "Ауд. 4",
        teacher: "Опришко Марʼян Іванович",
        description: "Лабораторна робота з Android",
        repeat_type: RepeatType.EveryWeek,
        start_date: new Date(startOfFirstWeek.getTime()),
        start_time: new Date("2024-09-03T10:20:00Z"),
        end_time: new Date("2024-09-03T11:55:00Z"),
        days_of_week: [DayOfWeek.Tuesday],
      },
      {
        name: "Технології захисту інформації",
        type: SubjectType.Practice,
        audience: "Ауд. 46",
        teacher: "Скоринович Василь Романович",
        description: "Лабораторна робота з технологій захисту інформації",
        repeat_type: RepeatType.EveryWeek,
        start_date: new Date(startOfFirstWeek.getTime()),
        start_time: new Date("2024-09-03T12:10:00Z"),
        end_time: new Date("2024-09-03T13:45:00Z"),
        days_of_week: [DayOfWeek.Tuesday],
      },
      {
        name: "Програмування мобільних систем під Android",
        type: SubjectType.Lecture,
        audience: "Ауд. 4",
        teacher: "Опришко Марʼян Іванович",
        description: "Лекція з Android",
        repeat_type: RepeatType.EveryWeek,
        start_date: new Date(startOfFirstWeek.getTime()),
        start_time: new Date("2024-09-03T14:30:00Z"),
        end_time: new Date("2024-09-03T16:05:00Z"),
        days_of_week: [DayOfWeek.Tuesday],
      },
      //#endregion

      //#region Wednesday
      {
        name: "Методи та засоби ООАП",
        type: SubjectType.Practice,
        audience: "Ауд. 47",
        teacher: "Волинець Євген Олегович",
        description: "Лабораторна робота з ООАП",
        repeat_type: RepeatType.EveryWeek,
        start_date: new Date(startOfFirstWeek.getTime()),
        start_time: new Date("2024-09-04T08:30:00Z"),
        end_time: new Date("2024-09-04T10:05:00Z"),
        days_of_week: [DayOfWeek.Wednesday],
      },
      {
        name: "Методи та засоби ООАП",
        type: SubjectType.Lecture,
        audience: "Ауд. 6",
        teacher: "Соколовський Ярослав Іванович",
        description: "Лекція з ООАП",
        repeat_type: RepeatType.Every2Weeks,
        start_date: new Date(startOfFirstWeek.getTime()),
        start_time: new Date("2024-09-04T10:20:00Z"),
        end_time: new Date("2024-09-04T11:55:00Z"),
        days_of_week: [DayOfWeek.Wednesday],
      },
      {
        name: "Машинне навчання",
        type: SubjectType.Lecture,
        audience: "Ауд. 1",
        teacher: "Лукащук Богдан Сергійович",
        description: "Лекція з машинного навчання",
        repeat_type: RepeatType.Every2Weeks,
        start_date: new Date(startOfSecondWeek.getTime()),
        start_time: new Date("2024-09-04T10:20:00Z"),
        end_time: new Date("2024-09-04T11:55:00Z"),
        days_of_week: [DayOfWeek.Wednesday],
      },
      {
        name: "Математчне моделювання",
        type: SubjectType.Practice,
        audience: "Ауд. 4",
        teacher: "Пірко Ігор Богданович",
        description: "Лабораторна робота з математчного моделювання",
        repeat_type: RepeatType.EveryWeek,
        start_date: new Date(startOfFirstWeek.getTime()),
        start_time: new Date("2024-09-04T12:10:00Z"),
        end_time: new Date("2024-09-04T13:45:00Z"),
        days_of_week: [DayOfWeek.Wednesday],
      },
      {
        name: "Машинне навчання",
        type: SubjectType.Practice,
        audience: "Ауд. 1",
        teacher: "Лукащук Богдан Сергійович",
        description: "Лабораторна робота з машинного навчання",
        repeat_type: RepeatType.EveryWeek,
        start_date: new Date(startOfFirstWeek.getTime()),
        start_time: new Date("2024-09-04T14:30:00Z"),
        end_time: new Date("2024-09-04T16:05:00Z"),
        days_of_week: [DayOfWeek.Wednesday],
      },
      //#endregion

      //#region Thursday
      {
        name: "Вебтехнології та вебдизайн",
        type: SubjectType.Lecture,
        audience: "Ауд. 6",
        teacher: "Карашецький Володимир Петрович",
        description: "Лекція з вебдизайну",
        repeat_type: RepeatType.EveryWeek,
        start_date: new Date(startOfFirstWeek.getTime()),
        start_time: new Date("2024-09-05T08:30:00Z"),
        end_time: new Date("2024-09-05T10:05:00Z"),
        days_of_week: [DayOfWeek.Thursday],
      },
      {
        name: "Хмарні технології",
        type: SubjectType.Lecture,
        audience: "Ауд. 6",
        teacher: "Івасюк Руслан Васильович",
        description: "Лекція з хмарних технологій",
        repeat_type: RepeatType.Every2Weeks,
        start_date: new Date(startOfFirstWeek.getTime()),
        start_time: new Date("2024-09-05T10:20:00Z"),
        end_time: new Date("2024-09-05T11:55:00Z"),
        days_of_week: [DayOfWeek.Thursday],
      },
      {
        name: "Математчне моделювання",
        type: SubjectType.Lecture,
        audience: "Ауд. 6",
        teacher: "Пірко Ігор Богданович",
        description: "Лекція з математчного моделювання",
        repeat_type: RepeatType.Every2Weeks,
        start_date: new Date(startOfSecondWeek.getTime()),
        start_time: new Date("2024-09-05T10:20:00Z"),
        end_time: new Date("2024-09-05T11:55:00Z"),
        days_of_week: [DayOfWeek.Thursday],
      },
      //#endregion

      //#region Friday
      {
        name: "Хмарні технології",
        type: SubjectType.Practice,
        audience: "Ауд. 36",
        teacher: "Івасюк Руслан Васильович",
        repeat_type: RepeatType.EveryWeek,
        start_date: new Date(startOfFirstWeek.getTime()),
        start_time: new Date("2024-09-02T12:10:00Z"),
        end_time: new Date("2024-09-02T13:45:00Z"),
        days_of_week: [DayOfWeek.Friday],
      },
      {
        name: "Вебтехнології та вебдизайн",
        type: SubjectType.Practice,
        audience: "Ауд. 4",
        teacher: "Карашецький Володимир Петрович",
        description: "Лабораторна робота з вебтехнологій та вебдизайну",
        repeat_type: RepeatType.EveryWeek,
        start_date: new Date(startOfFirstWeek.getTime()),
        start_time: new Date("2024-09-02T14:30:00Z"),
        end_time: new Date("2024-09-02T16:05:00Z"),
        days_of_week: [DayOfWeek.Friday],
      },
      //#endregion
    ];

    for (const subject of subjects) {
      await prisma.subject.create({
        data: subject,
      });
      console.log(`Created subject: ${subject.name}`);
    }

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
