import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Users, Target } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    {
      icon: TrendingUp,
      title: "Product Strategy",
      description: "Data-driven roadmaps that align business goals with user needs",
    },
    {
      icon: Users,
      title: "Cross-Functional Leadership",
      description: "Bridging engineering, design, and business stakeholders",
    },
    {
      icon: Target,
      title: "UX Optimization",
      description: "Converting insights into measurable improvements",
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">About Me</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm a Product Manager with a passion for building solutions that combine strategic thinking with 
            user-centered design. With a background in data analytics and cross-functional leadership, I help 
            teams ship products that matter. My approach focuses on understanding user behavior, testing 
            hypotheses quickly, and iterating based on real-world feedback.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <skill.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
              <p className="text-muted-foreground">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
