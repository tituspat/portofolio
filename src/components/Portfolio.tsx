import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, Code, File, Lock } from 'lucide-react';
import ProjectModal from './ProjectModal';

export type ProjectType = 'document' | 'code' | 'other';

export interface Project {
  id: string;
  type: ProjectType;
  title: string;
  description: string;
  thumbnail: string;
  context: string;
  role: string;
  tools: string[];
  impact: string[];
  liveUrl?: string;
  githubUrl?: string;
  pdfUrl?: string;
  locked?: boolean;
}

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const projects: Project[] = [
    {
      id: '1',
      type: 'document',
      title: 'Secure Voucher Distribution & Management System',
      description: 'Security-focused redesign preventing manual voucher exposure and fraud risk',
      thumbnail: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800&h=600&fit=crop',
      context:
        'The legacy voucher distribution model relied on unencrypted email sharing across multiple teams, which resulted in an actual voucher fraud incident. Project scope included designing secure voucher lifecycle handling, enforcing controlled access rights, and establishing encrypted distribution to external partners.',
      role: 'Product Manager',
      tools: ['Figma', 'Azure', 'Metabase'],
      impact: [
        'Eliminated internal voucher visibility to unauthorized users',
        'Introduced encrypted file distribution and password dual-channel delivery',
        'Added activity logs for audit and fraud prevention',
        'Unified generic and unique voucher flows into one standardized interface',
      ],
      pdfUrl: 'https://drive.google.com/file/d/1qBQrk9Y3wf3hP1g0p67_VmEdNa5nStZY/view?usp=drive_link',
      locked: false,
    },
    {
      id: '2',
      type: 'document',
      title: 'Multi-Channel OTP Request Architecture',
      description: 'Enabled user-chosen SMS fallback to ensure OTP delivery continuity',
      thumbnail: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=600&fit=crop',
      context:
        'WhatsApp-first OTP delivery was impacted by the deactivation of automatic SMS failover. Without an alternative flow, users without WhatsApp risked failure in registration, device verification, and security actions. The new system introduced explicit user selection for SMS fallback across all OTP-based flows.',
      role: 'Product Manager',
      tools: ['Figma', 'Azure DevOps', 'Miro', 'Confluence', 'Firebase'],
      impact: [
        'Maintained verification completion rate after failover shutdown',
        'Delivered consistent OTP UX across five security flows',
        'Reduced registration drop-off for non-WhatsApp users',
        'Improved user clarity through proactive confirmation and retry logic',
      ],
      pdfUrl: 'https://drive.google.com/file/d/1XTWpjoytJAuLUgcTyQYMQtbNKvHzKgrE/view?usp=sharing',
      locked: false,
    },
    {
      id: '3',
      type: 'document',
      title: 'Decentralized On-Hold Points Approval Workflow',
      description: 'Rebalanced workload to reduce queue backlog and expedite point issuance',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      context:
        'On-hold point verification was concentrated in a single role, resulting in >6K unprocessed transactions and delays exceeding 200 days. The initiative introduced multi-role filtering, controlled request-to-approve logic, and bulk processing capabilities to accelerate throughput.',
      role: 'Product Manager',
      tools: ['Figma', 'Azure DevOps', 'Metabase', 'Confluence', 'Miro'],
      impact: [
        'Improved on-hold processing SLA by distributing approval roles',
        'Reduced average processing time >15% target',
        'Enabled bulk processing to clear accumulated queues',
        'Enhanced operational transparency with new status states and logs',
      ],
      pdfUrl: 'https://example.com/onhold-approval.pdf',
      locked: true,
    },
  ];

  return (
    <section id="portfolio" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Portfolio</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">Selected projects showcasing strategic product work and measurable impact</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const TypeIcon = project.type === 'document' ? FileText : project.type === 'code' ? Code : File;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all group"
              >
                <div className="aspect-video bg-muted overflow-hidden relative">
                  <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className="bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                      <TypeIcon className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium capitalize">{project.type}</span>
                    </div>
                    {project.locked && (
                      <div className="bg-background/90 backdrop-blur-sm p-2 rounded-full">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <Button variant="outline" onClick={() => setSelectedProject(project)} className="w-full border-border hover:bg-primary hover:text-primary-foreground hover:border-primary">
                    View Details
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

export default Portfolio;
