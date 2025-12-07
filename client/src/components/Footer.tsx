import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 mt-20">
      <div className="container main-wrapper">
        <div className="flex flex-col gap-12 md:flex-row justify-between mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-title  font-bold">
                Daily<span className="text-accent ">Draft</span>
              </span>
            </Link>
            <p className="text-background/70 max-w-sm font-satoshi">
              Your daily source for AI-generated articles covering technology,
              science, business, and more.
            </p>
          </div>
          <div>
            <h4 className="font-satoshi font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/10 pt-8 text-center text-background/50 text-sm">
          © {new Date().getFullYear()} DailyDraft. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
