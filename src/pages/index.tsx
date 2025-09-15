import { NextPage } from 'next';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import MissionVisionSection from '../components/MissionVisionSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import InterviewQuestionsSection from '../components/InterviewQuestionsSection';

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <MissionVisionSection />
      <SkillsSection />
      <ProjectsSection />
      <InterviewQuestionsSection />
    </>
  );
};

export default Home;
