import { PrismaClient, RepeatType, SubjectType, TeacherPosition } from "@prisma/client";

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
      },
    });

    const subjectsData = [
      { name: "Хмарні технології", type: SubjectType.Practice },
      { name: "Хмарні технології", type: SubjectType.Lecture },
      { name: "Вебтехнології та вебдизайн", type: SubjectType.Practice },
      { name: "Вебтехнології та вебдизайн", type: SubjectType.Lecture },
      { name: "Технології захисту інформації", type: SubjectType.Practice },
      { name: "Технології захисту інформації", type: SubjectType.Lecture },
      { name: "Програмування мобільних систем під Android", type: SubjectType.Practice },
      { name: "Програмування мобільних систем під Android", type: SubjectType.Lecture },
      { name: "Методи та засоби ООАП", type: SubjectType.Practice },
      { name: "Методи та засоби ООАП", type: SubjectType.Lecture },
      { name: "Машинне навчання", type: SubjectType.Practice },
      { name: "Машинне навчання", type: SubjectType.Lecture },
      { name: "Математчне моделювання", type: SubjectType.Practice },
      { name: "Математчне моделювання", type: SubjectType.Lecture },
    ];

    const teachersData = [
      { name: "Івасюк Руслан Васильович", position: TeacherPosition.Assistant },
      { name: "Карашецький Володимир Петрович", position: TeacherPosition.AssociateProfessor },
      { name: "Грицюк Юрій Іванович", position: TeacherPosition.Professor },
      { name: "Опришко Марʼян Іванович", position: TeacherPosition.Assistant },
      { name: "Скоринович Василь Романович", position: TeacherPosition.Assistant },
      { name: "Волинець Євген Олегович", position: TeacherPosition.Assistant },
      { name: "Соколовський Ярослав Іванович", position: TeacherPosition.Professor },
      { name: "Лукащук Богдан Сергійович", position: TeacherPosition.Assistant },
      { name: "Пірко Ігор Богданович", position: TeacherPosition.AssociateProfessor },
    ];

    const audiencesData = ["Ауд. 36", "Ауд. 4", "Ауд. 46", "Ауд. 47", "Ауд. 6", "Ауд. 1"];

    await prisma.subject.createMany({ data: subjectsData });
    await prisma.teacher.createMany({ data: teachersData });
    await prisma.audience.createMany({ data: audiencesData.map((name) => ({ name })) });

    const subjects = await prisma.subject.findMany();
    const teachers = await prisma.teacher.findMany();
    const audiences = await prisma.audience.findMany();

    const getSubjectId = (name: string, type: SubjectType) =>
      subjects.find((s) => s.name === name && s.type === type)?.id;
    const getTeacherId = (name: string) => teachers.find((t) => t.name === name)?.id;
    const getAudienceId = (name: string) => audiences.find((a) => a.name === name)?.id;

    const lessons = [
      {
        subject: { name: "Хмарні технології", type: SubjectType.Practice },
        teacher: "Івасюк Руслан Васильович",
        audience: "Ауд. 36",
        start_time: "2025-03-17T12:10:00Z",
        duration: 95,
        start_date: "2025-03-17T12:10:00Z",
        repeat_type: RepeatType.Weekly,
        repeat_value: 1,
      },
      {
        subject: { name: "Вебтехнології та вебдизайн", type: SubjectType.Practice },
        audience: "Ауд. 4",
        teacher: "Карашецький Володимир Петрович",
        start_time: "2025-03-17T14:30:00Z",
        duration: 95,
        start_date: "2025-03-17T14:30:00Z",
        repeat_type: RepeatType.Weekly,
        repeat_value: 1,
      },
      {
        subject: { name: "Технології захисту інформації", type: SubjectType.Lecture },
        audience: "Ауд. 46",
        teacher: "Грицюк Юрій Іванович",
        start_time: "2025-03-18T08:30:00Z",
        duration: 95,
        start_date: "2025-03-18T08:30:00Z",
        repeat_type: RepeatType.Weekly,
        repeat_value: 1,
      },
      {
        subject: { name: "Програмування мобільних систем під Android", type: SubjectType.Practice },
        audience: "Ауд. 4",
        teacher: "Опришко Марʼян Іванович",
        start_time: "2025-03-18T10:20:00Z",
        duration: 95,
        start_date: "2025-03-18T10:20:00Z",
        repeat_type: RepeatType.Weekly,
        repeat_value: 1,
      },
      {
        subject: { name: "Технології захисту інформації", type: SubjectType.Practice },
        audience: "Ауд. 46",
        teacher: "Скоринович Василь Романович",
        start_time: "2025-03-18T12:10:00Z",
        duration: 95,
        start_date: "2025-03-18T12:10:00Z",
        repeat_type: RepeatType.Weekly,
        repeat_value: 1,
      },
      {
        subject: { name: "Програмування мобільних систем під Android", type: SubjectType.Lecture },
        audience: "Ауд. 4",
        teacher: "Опришко Марʼян Іванович",
        start_time: "2025-03-18T14:30:00Z",
        duration: 95,
        start_date: "2025-03-18T14:30:00Z",
        repeat_type: RepeatType.Weekly,
        repeat_value: 1,
      },
      {
        subject: { name: "Методи та засоби ООАП", type: SubjectType.Practice },
        audience: "Ауд. 47",
        teacher: "Волинець Євген Олегович",
        start_time: "2025-03-19T08:30:00Z",
        duration: 95,
        start_date: "2025-03-19T08:30:00Z",
        repeat_type: RepeatType.Weekly,
        repeat_value: 1,
      },
      {
        subject: { name: "Методи та засоби ООАП", type: SubjectType.Lecture },
        audience: "Ауд. 6",
        teacher: "Соколовський Ярослав Іванович",
        start_time: "2025-03-19T10:20:00Z",
        duration: 95,
        start_date: "2025-03-19T10:20:00Z",
        repeat_type: RepeatType.Weekly,
        repeat_value: 2,
      },
      {
        subject: { name: "Машинне навчання", type: SubjectType.Lecture },
        audience: "Ауд. 1",
        teacher: "Лукащук Богдан Сергійович",
        start_time: "2025-03-26T14:30:00Z",
        duration: 95,
        start_date: "2025-03-26T14:30:00Z",
        repeat_type: RepeatType.Weekly,
        repeat_value: 2,
      },
      {
        subject: { name: "Математчне моделювання", type: SubjectType.Practice },
        audience: "Ауд. 4",
        teacher: "Пірко Ігор Богданович",
        start_time: "2025-03-19T12:10:00Z",
        duration: 95,
        start_date: "2025-03-19T12:10:00Z",
        repeat_type: RepeatType.Weekly,
        repeat_value: 1,
      },
      {
        subject: { name: "Машинне навчання", type: SubjectType.Practice },
        audience: "Ауд. 1",
        teacher: "Лукащук Богдан Сергійович",
        start_time: "2025-03-19T14:30:00Z",
        duration: 95,
        start_date: "2025-03-19T14:30:00Z",
        repeat_type: RepeatType.Weekly,
        repeat_value: 1,
      },
      {
        subject: { name: "Вебтехнології та вебдизайн", type: SubjectType.Lecture },
        audience: "Ауд. 6",
        teacher: "Карашецький Володимир Петрович",
        start_time: "2025-03-21T08:30:00Z",
        duration: 95,
        start_date: "2025-03-21T08:30:00Z",
        repeat_type: RepeatType.Weekly,
        repeat_value: 1,
      },
      {
        subject: { name: "Хмарні технології", type: SubjectType.Lecture },
        teacher: "Івасюк Руслан Васильович",
        audience: "Ауд. 6",
        start_time: "2025-03-21T10:20:00Z",
        duration: 95,
        start_date: "2025-03-21T10:20:00Z",
        repeat_type: RepeatType.Weekly,
        repeat_value: 2,
      },
      {
        subject: { name: "Математчне моделювання", type: SubjectType.Lecture },
        audience: "Ауд. 6",
        teacher: "Пірко Ігор Богданович",
        start_time: "2025-03-28T10:20:00Z",
        duration: 95,
        start_date: "2025-03-28T10:20:00Z",
        repeat_type: RepeatType.Weekly,
        repeat_value: 2,
      },
    ];

    for (const lesson of lessons) {
      const subjectId = getSubjectId(lesson.subject.name, lesson.subject.type);
      const teacherId = getTeacherId(lesson.teacher);
      const audienceId = getAudienceId(lesson.audience);
      const startTime = new Date(lesson.start_time);
      const duration = lesson.duration;

      const lessonItem = await prisma.lesson.create({
        data: {
          subjectId: subjectId!,
          teacherId: teacherId!,
          audienceId: audienceId!,
          groupId: group.id,
          startTime,
          duration,
        },
      });

      await prisma.lessonRecurrence.create({
        data: {
          lessonId: lessonItem.id,
          startDate: lesson.start_date,
          endDate: new Date("2025-06-12T23:59:59Z"),
          repeatType: lesson.repeat_type,
          repeatValue: lesson.repeat_value,
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
