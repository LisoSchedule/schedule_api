import {
  PrismaClient,
  UserStep,
  RepeatType,
  SubjectType,
  TeacherPosition,
} from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    const group = await prisma.group.create({
      data: {
        name: "ComputerScience_31",
        subGroup: 2,
      },
    });

    const user = await prisma.user.create({
      data: {
        chatId: 123456789,
        username: "wastardy",
        nickname: "Andrew",
        groupId: group.id,
        step: UserStep.MainMenu,
      },
    });

    const startOfFirstWeek = new Date("2024-09-02T08:30:00Z");
    const startOfSecondWeek = new Date("2024-09-09T08:30:00Z");

    const subjectsData = [
      { name: "Хмарні технології", type: SubjectType.Practice },
      { name: "Хмарні технології", type: SubjectType.Lecture },
      { name: "Вебтехнології та вебдизайн", type: SubjectType.Practice },
      { name: "Вебтехнології та вебдизайн", type: SubjectType.Lecture },
      { name: "Технології захисту інформації", type: SubjectType.Practice },
      { name: "Технології захисту інформації", type: SubjectType.Lecture },
      {
        name: "Програмування мобільних систем під Android",
        type: SubjectType.Practice,
      },
      {
        name: "Програмування мобільних систем під Android",
        type: SubjectType.Lecture,
      },
      { name: "Методи та засоби ООАП", type: SubjectType.Practice },
      { name: "Методи та засоби ООАП", type: SubjectType.Lecture },
      { name: "Машинне навчання", type: SubjectType.Practice },
      { name: "Машинне навчання", type: SubjectType.Lecture },
      { name: "Математчне моделювання", type: SubjectType.Practice },
      { name: "Математчне моделювання", type: SubjectType.Lecture },
    ];

    const teachersData = [
      { name: "Івасюк Руслан Васильович", position: TeacherPosition.Assistant },
      {
        name: "Карашецький Володимир Петрович",
        position: TeacherPosition.AssociateProfessor,
      },
      { name: "Грицюк Юрій Іванович", position: TeacherPosition.Professor },
      { name: "Опришко Марʼян Іванович", position: TeacherPosition.Assistant },
      {
        name: "Скоринович Василь Романович",
        position: TeacherPosition.Assistant,
      },
      { name: "Волинець Євген Олегович", position: TeacherPosition.Assistant },
      {
        name: "Соколовський Ярослав Іванович",
        position: TeacherPosition.AssociateProfessor,
      },
      {
        name: "Лукащук Богдан Сергійович",
        position: TeacherPosition.AssociateProfessor,
      },
      { name: "Пірко Ігор Богданович", position: TeacherPosition.Assistant },
    ];

    const audiencesData = [
      "Ауд. 36",
      "Ауд. 4",
      "Ауд. 46",
      "Ауд. 47",
      "Ауд. 6",
      "Ауд. 1",
    ];

    await prisma.subject.createMany({ data: subjectsData });
    await prisma.teacher.createMany({ data: teachersData });
    await prisma.audience.createMany({
      data: audiencesData.map((name) => ({ name })),
    });

    const subjects = await prisma.subject.findMany();
    const teachers = await prisma.teacher.findMany();
    const audiences = await prisma.audience.findMany();

    const getSubjectId = (name: string, type: SubjectType) =>
      subjects.find((s) => s.name === name && s.type === type)?.id;
    const getTeacherId = (name: string) =>
      teachers.find((t) => t.name === name)?.id;
    const getAudienceId = (name: string) =>
      audiences.find((a) => a.name === name)?.id;

    const lessons = [
      {
        subject: { name: "Хмарні технології", type: SubjectType.Practice },
        audience: "Ауд. 36",
        teacher: "Івасюк Руслан Васильович",
        start: "2024-09-02T12:10:00Z",
        end: "2024-09-02T13:45:00Z",
        start_date: startOfFirstWeek,
        repeat_type: RepeatType.Weekly,
      },
      {
        subject: {
          name: "Вебтехнології та вебдизайн",
          type: SubjectType.Practice,
        },
        audience: "Ауд. 4",
        teacher: "Карашецький Володимир Петрович",
        start: "2024-09-02T14:30:00Z",
        end: "2024-09-02T16:05:00Z",
        start_date: startOfFirstWeek,
        repeat_type: RepeatType.Weekly,
      },
      {
        subject: {
          name: "Технології захисту інформації",
          type: SubjectType.Lecture,
        },
        audience: "Ауд. 46",
        teacher: "Грицюк Юрій Іванович",
        start: "2024-09-03T08:30:00Z",
        end: "2024-09-03T10:05:00Z",
        start_date: startOfFirstWeek,
        repeat_type: RepeatType.Weekly,
      },
      {
        subject: {
          name: "Програмування мобільних систем під Android",
          type: SubjectType.Practice,
        },
        audience: "Ауд. 4",
        teacher: "Опришко Марʼян Іванович",
        start: "2024-09-03T10:20:00Z",
        end: "2024-09-03T11:55:00Z",
        start_date: startOfFirstWeek,
        repeat_type: RepeatType.Weekly,
      },
      {
        subject: {
          name: "Технології захисту інформації",
          type: SubjectType.Practice,
        },
        audience: "Ауд. 46",
        teacher: "Скоринович Василь Романович",
        start: "2024-09-03T12:10:00Z",
        end: "2024-09-03T13:45:00Z",
        start_date: startOfFirstWeek,
        repeat_type: RepeatType.Weekly,
      },
      {
        subject: {
          name: "Програмування мобільних систем під Android",
          type: SubjectType.Lecture,
        },
        audience: "Ауд. 4",
        teacher: "Опришко Марʼян Іванович",
        start: "2024-09-03T14:30:00Z",
        end: "2024-09-03T16:05:00Z",
        start_date: startOfFirstWeek,
        repeat_type: RepeatType.Weekly,
      },
      {
        subject: { name: "Методи та засоби ООАП", type: SubjectType.Practice },
        audience: "Ауд. 47",
        teacher: "Волинець Євген Олегович",
        start: "2024-09-04T08:30:00Z",
        end: "2024-09-04T10:05:00Z",
        start_date: startOfFirstWeek,
        repeat_type: RepeatType.Weekly,
      },
      {
        subject: { name: "Методи та засоби ООАП", type: SubjectType.Lecture },
        audience: "Ауд. 6",
        teacher: "Соколовський Ярослав Іванович",
        start: "2024-09-04T10:20:00Z",
        end: "2024-09-04T11:55:00Z",
        start_date: startOfFirstWeek,
        repeat_type: RepeatType.Weekly,
      },
      {
        subject: { name: "Машинне навчання", type: SubjectType.Lecture },
        audience: "Ауд. 1",
        teacher: "Лукащук Богдан Сергійович",
        start: "2024-09-04T10:20:00Z",
        end: "2024-09-04T11:55:00Z",
        start_date: startOfSecondWeek,
        repeat_type: RepeatType.Weekly,
      },
      {
        subject: { name: "Математчне моделювання", type: SubjectType.Practice },
        audience: "Ауд. 4",
        teacher: "Пірко Ігор Богданович",
        start: "2024-09-04T12:10:00Z",
        end: "2024-09-04T13:45:00Z",
        start_date: startOfFirstWeek,
        repeat_type: RepeatType.Weekly,
      },
    ];

    for (const lesson of lessons) {
      const subjectId = getSubjectId(lesson.subject.name, lesson.subject.type);
      const teacherId = getTeacherId(lesson.teacher);
      const audienceId = getAudienceId(lesson.audience);

      const start_time = new Date(lesson.start);
      const end_time = new Date(lesson.end);
      const duration = (end_time.getTime() - start_time.getTime()) / 60000;

      const classItem = await prisma.class.create({
        data: {
          subjectId: subjectId!,
          teacherId: teacherId!,
          audienceId: audienceId!,
          groupId: group.id,
          start_time,
          duration,
        },
      });

      await prisma.classesSchedule.create({
        data: {
          classId: classItem.id,
          start_date: lesson.start_date,
          end_date: new Date("2024-12-15"),
          repeat_type: lesson.repeat_type,
          repeat_value: 1,
        },
      });
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
