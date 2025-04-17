
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsDialogProps {
  open: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const TermsDialog = ({ open, onAccept, onDecline }: TermsDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Terms of Service & Privacy Policy</DialogTitle>
          <DialogDescription>
            Please read and accept our terms of service and privacy policy to continue.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            <section>
              <h3 className="font-bold mb-2">1. Data Collection and Usage</h3>
              <p>We collect and process the following data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email address for authentication</li>
                <li>Meditation preferences and settings</li>
                <li>App usage statistics to improve our service</li>
                <li>Notification preferences</li>
              </ul>
            </section>
            
            <section>
              <h3 className="font-bold mb-2">2. Notifications</h3>
              <p>By accepting these terms, you agree to receive:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Daily meditation reminders</li>
                <li>Important updates about the service</li>
                <li>You can modify notification settings in your account</li>
              </ul>
            </section>
            
            <section>
              <h3 className="font-bold mb-2">3. Privacy Protection</h3>
              <p>We are committed to protecting your privacy:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your data is encrypted and securely stored</li>
                <li>We never share your personal information</li>
                <li>You can request data deletion at any time</li>
              </ul>
            </section>
          </div>
        </ScrollArea>

        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={onDecline}>
            Decline
          </Button>
          <Button onClick={onAccept}>
            Accept Terms
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TermsDialog;
