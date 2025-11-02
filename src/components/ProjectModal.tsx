import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, FileText, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Project } from './Portfolio';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold pr-8">{project.title}</DialogTitle>
        </DialogHeader>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="space-y-6">
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Context</h3>
            <p className="text-muted-foreground leading-relaxed">{project.context}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">My Role</h3>
            <p className="text-muted-foreground">{project.role}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Tools & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Impact & Results</h3>
            <ul className="space-y-2">
              {project.impact.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {(project.liveUrl || project.githubUrl || project.pdfUrl) && (
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              {project.locked ? (
                <div className="flex items-center justify-center gap-2 p-4 bg-muted/50 rounded-lg">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <p className="text-muted-foreground">This project is locked and not publicly accessible</p>
                </div>
              ) : (
                <>
                  {project.type === 'document' && project.pdfUrl && (
                    <Button variant="default" className="w-full bg-primary hover:bg-primary/90" onClick={() => window.open(project.pdfUrl, '_blank')}>
                      <FileText className="mr-2 h-4 w-4" />
                      View Document (PDF)
                    </Button>
                  )}

                  {project.type === 'code' && (
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <Button variant="default" className="flex-1 bg-primary hover:bg-primary/90" onClick={() => window.open(project.liveUrl, '_blank')}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Preview
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" className="flex-1 border-border hover:bg-card" onClick={() => window.open(project.githubUrl, '_blank')}>
                          <Github className="mr-2 h-4 w-4" />
                          View Code
                        </Button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
