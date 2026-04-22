import { Link } from "react-router";
import { useState, useEffect } from "react";
import Quantum360Logo from "@/imports/Quantum360Logo-45-29";
import { LoginToggleButton } from "./LoginToggleButton";
import { SparkleIcon } from "./SparkleIcon";

export function ChatPage() {
  const [isThinking, setIsThinking] = useState(true);
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    // Show thinking indicator for 2 seconds
    const thinkingTimer = setTimeout(() => {
      setIsThinking(false);
      setShowResponse(true);
    }, 2000);

    return () => clearTimeout(thinkingTimer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border h-[80px]">
        <div className="w-full px-4 sm:px-6 h-full">
          <div className="flex items-center justify-between gap-4 h-full">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="w-[135px] h-[35px] sm:w-[169px] sm:h-[44px]">
                <Quantum360Logo />
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <LoginToggleButton />
            </div>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-8 space-y-6">
          {/* User Message */}
          <div className="flex justify-end animate-[slideInRight_0.3s_ease-out]">
            <div className="bg-primary text-primary-foreground rounded-lg px-4 py-3 max-w-[80%]">
              <p className="text-[15px]">
                How do I invite team members to my workspace?
              </p>
            </div>
          </div>

          {/* AI Thinking Indicator */}
          {isThinking && (
            <div className="flex gap-3 items-start animate-[fadeIn_0.3s_ease-out]">
              <div className="shrink-0 mt-1">
                <SparkleIcon />
              </div>
              <div className="bg-card border border-border rounded-lg px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-[bounce_1s_ease-in-out_infinite]" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-[bounce_1s_ease-in-out_0.2s_infinite]" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-[bounce_1s_ease-in-out_0.4s_infinite]" />
                </div>
              </div>
            </div>
          )}

          {/* AI Response */}
          {showResponse && (
            <div className="flex gap-3 items-start animate-[slideInLeft_0.4s_ease-out]">
              <div className="shrink-0 mt-1">
                <SparkleIcon />
              </div>
              <div className="bg-card border border-border rounded-lg px-4 py-3 max-w-[80%]">
                <p className="text-[15px] mb-3">
                  To invite team members to your workspace in Quantum 360, follow these steps:
                </p>
                <ol className="space-y-2 text-[15px] list-decimal list-inside">
                  <li>Go to <strong>Workspace Settings</strong> in the left sidebar</li>
                  <li>Click on the <strong>Members</strong> tab</li>
                  <li>Click the <strong>"Invite Members"</strong> button</li>
                  <li>Enter the email addresses of the team members you want to invite</li>
                  <li>Assign their roles (Admin, Member, or Guest)</li>
                  <li>Click <strong>"Send Invitations"</strong></li>
                </ol>
                <p className="text-[15px] mt-3 text-muted-foreground">
                  They'll receive an email invitation with a link to join your workspace.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border px-4 sm:px-6 py-4">
          <div className="bg-white border border-border rounded-lg flex items-center px-4 py-3 gap-3">
            <input
              type="text"
              placeholder="Ask a question..."
              className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground text-[15px]"
              disabled
            />
            <button className="bg-primary text-primary-foreground rounded-md px-4 py-2 hover:opacity-90 transition-opacity">
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
