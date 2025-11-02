import { Brain } from 'lucide-react'

function Footer() {
  return (
     <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                <Brain className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">TalentSync</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 TalentSync. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
