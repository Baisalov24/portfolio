import { Header } from "./shared/ui/Header/Header.jsx";
import { Presentation } from "./entities/presentation/Presentation.jsx";
import { Experience } from "./entities/experience/Experience.jsx";
import { Skills } from "./entities/skills/Skills.jsx";
import { Projects } from "./entities/project/Projects.jsx";
import { Contacts } from "./entities/contacts/Contacts.jsx";

export default function App() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: "var(--header-h)" }}>
        <Presentation />
        <Experience />
        <Skills />
        <Projects />
        <Contacts />
      </main>
    </div>
  );
}
