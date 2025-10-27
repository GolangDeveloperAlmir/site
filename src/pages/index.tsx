import { NextPage } from 'next';
import Hero from '../components/Hero';
import AboutSection from '../components/sections/AboutSection';
import MissionSection from '../components/sections/MissionSection';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import InterviewQuestionsSection from '../components/sections/InterviewQuestionsSection';
import TravelSection from '../components/sections/TravelSection';
import GallerySection from '../components/sections/GallerySection';
import TimelineSection from '../components/sections/TimelineSection';
import AchievementsSection from '../components/sections/AchievementsSection';
import InspirationSection from '../components/sections/InspirationSection';
import FAQSection from '../components/sections/FAQSection';
import NowSection from '../components/sections/NowSection';
import RecommendedSection from '../components/sections/RecommendedSection';
import ToolsSection from '../components/sections/ToolsSection';
import MicroblogSection from '../components/sections/MicroblogSection';
import MusicSection from '../components/sections/MusicSection';
import ComingSoonSection from '../components/sections/ComingSoonSection';
import ContactSection from '../components/sections/ContactSection';
import GitHubWidget from '../components/GitHubWidget';

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <MissionSection />
      <SkillsSection />
      <ProjectsSection />
      <InterviewQuestionsSection />
      <TravelSection />
      <GallerySection />
      <TimelineSection />
      <AchievementsSection />
      <InspirationSection />
      <GitHubWidget />
      <FAQSection />
      <NowSection />
      <RecommendedSection />
      <ToolsSection />
      <MicroblogSection />
      <MusicSection />
      <ComingSoonSection />
      <ContactSection />
    </>
  );
};

export default Home;
