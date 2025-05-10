import {
  PrismaClient,
  UserStep,
  DayOfWeek,
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

    console.log();

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
