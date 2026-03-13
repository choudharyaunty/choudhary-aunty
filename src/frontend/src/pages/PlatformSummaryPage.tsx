export default function PlatformSummaryPage() {
  return (
    <>
      <style>{`
        .ps-sticky-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          background: #b45309;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 14px 20px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
        }
        .ps-sticky-text {
          font-family: 'Segoe UI', Arial, sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.01em;
        }
        .ps-sticky-btn {
          background: #fff;
          color: #b45309;
          border: none;
          padding: 9px 22px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 700;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: background 0.15s;
        }
        .ps-sticky-btn:hover { background: #fef3c7; }
        .ps-h1 { font-size: 28px; color: #b45309; border-bottom: 3px solid #b45309; padding-bottom: 10px; margin-bottom: 6px; }
        .ps-subtitle { color: #78716c; font-size: 13px; margin-bottom: 32px; }
        .ps-h2 { font-size: 18px; color: #92400e; margin: 36px 0 12px 0; padding: 8px 14px; background: #fef3c7; border-left: 4px solid #b45309; border-radius: 4px; }
        .ps-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
        .ps-table thead tr { background: #b45309; color: #fff; }
        .ps-table thead th { padding: 10px 12px; text-align: left; font-weight: 600; }
        .ps-table tbody tr:nth-child(even) { background: #fef9f0; }
        .ps-table tbody tr:nth-child(odd) { background: #ffffff; }
        .ps-table tbody td { padding: 9px 12px; border-bottom: 1px solid #e7e0d8; vertical-align: top; line-height: 1.5; }
        .ps-badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; margin: 2px 2px 2px 0; }
        .ps-live { background: #dcfce7; color: #166534; }
        .ps-internal { background: #dbeafe; color: #1e40af; }
        .ps-ai { background: #ede9fe; color: #5b21b6; }
        .ps-next { background: #fef9c3; color: #713f12; }
        .ps-print-btn { background: #b45309; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; margin-bottom: 24px; }
        .ps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
        .ps-card { background: #fff; border: 1px solid #e7e0d8; border-radius: 8px; padding: 16px; text-align: center; }
        .ps-num { font-size: 32px; font-weight: 700; color: #b45309; }
        .ps-label { font-size: 12px; color: #78716c; margin-top: 4px; }
        .ps-toc { background: #fff8ed; border: 1px solid #f0d9b5; border-radius: 8px; padding: 16px 24px; margin-bottom: 32px; }
        .ps-toc h3 { color: #b45309; margin-bottom: 10px; font-size: 14px; }
        .ps-toc ol { padding-left: 20px; font-size: 13px; line-height: 2; color: #78716c; }
        .ps-footer { color: #78716c; font-size: 12px; text-align: center; padding: 20px 0; border-top: 1px solid #e7e0d8; margin-top: 24px; }
        @media print { .ps-sticky-bar { display: none; } .ps-print-btn { display: none; } }
        @media (max-width: 640px) {
          .ps-grid { grid-template-columns: repeat(2,1fr); }
          .ps-table { font-size: 11px; }
          .ps-sticky-text { font-size: 12px; }
          .ps-sticky-btn { font-size: 12px; padding: 7px 14px; }
          .ps-sticky-bar { flex-wrap: wrap; gap: 8px; padding: 10px 12px; }
        }
      `}</style>

      {/* Sticky PDF bar */}
      <div className="ps-sticky-bar" data-ocid="summary.primary_button">
        <span className="ps-sticky-text">
          🖨️ Save as PDF — Click here, then choose &ldquo;Save as PDF&rdquo; in
          the print dialog
        </span>
        <button
          type="button"
          className="ps-sticky-btn"
          onClick={() => window.print()}
        >
          ↓ Download / Print PDF
        </button>
      </div>

      <div
        style={{
          fontFamily: "'Segoe UI', Arial, sans-serif",
          background: "#fdfaf6",
          color: "#1a1a1a",
          padding: "32px",
          paddingTop: "80px",
          minHeight: "100vh",
        }}
      >
        <h1 className="ps-h1">Choudhary Aunty — Complete Platform Summary</h1>
        <p className="ps-subtitle">
          As of March 2026 &nbsp;|&nbsp; Version 43 &nbsp;|&nbsp;
          www.choudharyaunty.com
        </p>

        <div className="ps-grid">
          <div className="ps-card">
            <div className="ps-num">43</div>
            <div className="ps-label">Versions Built</div>
          </div>
          <div className="ps-card">
            <div className="ps-num">25+</div>
            <div className="ps-label">Pages & Routes</div>
          </div>
          <div className="ps-card">
            <div className="ps-num">20</div>
            <div className="ps-label">AI Intelligence Modules</div>
          </div>
          <div className="ps-card">
            <div className="ps-num">10</div>
            <div className="ps-label">Internal Dashboards</div>
          </div>
        </div>

        <div className="ps-toc">
          <h3>Table of Contents</h3>
          <ol>
            <li>Core Marketplace Features</li>
            <li>Internal Dashboards & Tools</li>
            <li>AI & Intelligence Modules</li>
            <li>Community Modules</li>
            <li>Technology Stack</li>
            <li>Data Architecture</li>
            <li>All Routes & Access Credentials</li>
            <li>Next to Build — Section-wise Roadmap</li>
          </ol>
        </div>

        {/* SECTION 1 */}
        <h2 className="ps-h2">1. Core Marketplace Features</h2>
        <table className="ps-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Purpose</th>
              <th>Input / Data Source</th>
              <th>Output / Result</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>State-Based Discovery</td>
              <td>
                Customers browse food by Indian state (Bihar live, others coming
                soon)
              </td>
              <td>State, Region, Product database</td>
              <td>State page with regional food culture + product catalog</td>
              <td>
                <span className="ps-badge ps-live">Live</span>
              </td>
            </tr>
            <tr>
              <td>Bihar ki Rasoi</td>
              <td>First live state module — 3 regions, 8 products, 16 SKUs</td>
              <td>Bihar SKU catalog</td>
              <td>/state/bihar — full product + variant + aunty flow</td>
              <td>
                <span className="ps-badge ps-live">Live</span>
              </td>
            </tr>
            <tr>
              <td>Product Variant System (SKU)</td>
              <td>
                Each product has multiple variants (e.g. Coconut Laddoo: Basic,
                Meva Premium)
              </td>
              <td>Admin product management form</td>
              <td>
                Variant page with ingredients (2kg batch), prep steps, aunty
                selection
              </td>
              <td>
                <span className="ps-badge ps-live">Live</span>
              </td>
            </tr>
            <tr>
              <td>Aunty Selection per Variant</td>
              <td>
                Customer chooses which aunty cooks their specific variant — core
                differentiator
              </td>
              <td>Aunty-Variant mapping table</td>
              <td>
                Choose Your Aunty screen with comparison (experience, rating,
                price, story)
              </td>
              <td>
                <span className="ps-badge ps-live">Live</span>
              </td>
            </tr>
            <tr>
              <td>Product Management (Admin)</td>
              <td>
                Admin adds/edits products with all 5 images, variants,
                ingredients, prep steps, pricing
              </td>
              <td>Admin form input — manual</td>
              <td>
                Product stored in localStorage; displayed on Bihar product pages
              </td>
              <td>
                <span className="ps-badge ps-live">Live</span>
              </td>
            </tr>
            <tr>
              <td>Aunty Badge System</td>
              <td>Trust signals on aunty cards and profiles</td>
              <td>Admin assignment during onboarding</td>
              <td>
                Badges shown on aunty cards, variant pages, and profile pages
              </td>
              <td>
                <span className="ps-badge ps-live">Live</span>
              </td>
            </tr>
            <tr>
              <td>WhatsApp Order Flow</td>
              <td>
                Customer selects variant + aunty → places order via WhatsApp
                (Phase 1)
              </td>
              <td>Customer selection (variant, aunty, batch size)</td>
              <td>Pre-filled WhatsApp message to aunty/team</td>
              <td>
                <span className="ps-badge ps-live">Live</span>
              </td>
            </tr>
            <tr>
              <td>Dietary Preference Filter</td>
              <td>Customer filters by Regular / Jain / Vegan / Low Oil</td>
              <td>Customer selection</td>
              <td>Filtered product list</td>
              <td>
                <span className="ps-badge ps-live">Live</span>
              </td>
            </tr>
            <tr>
              <td>Aunty Profile Page</td>
              <td>
                Customer-facing profile with photo, story, badges, ratings,
                products offered
              </td>
              <td>Aunty onboarding data</td>
              <td>Emotional aunty profile page at /bihar-aunty/:id</td>
              <td>
                <span className="ps-badge ps-live">Live</span>
              </td>
            </tr>
            <tr>
              <td>Customer Login & Profile</td>
              <td>
                Phone/email signup with OTP simulation, taste preferences, order
                history, loyalty points
              </td>
              <td>Customer self-registration</td>
              <td>
                Personalized profile with recommendations, saved addresses,
                favorites
              </td>
              <td>
                <span className="ps-badge ps-live">Live</span>
              </td>
            </tr>
            <tr>
              <td>Loyalty Program (Rishta Rewards)</td>
              <td>
                Asharfi points system with tiers for customers and aunties;
                gamification
              </td>
              <td>Order data, customer activity</td>
              <td>Points balance, tier status, milestone progress</td>
              <td>
                <span className="ps-badge ps-live">Live</span>
              </td>
            </tr>
            <tr>
              <td>Batch Order Management</td>
              <td>
                Ethical Batch Resolution System — aggregates orders, checks
                compatibility
              </td>
              <td>Customer orders, batch constraints</td>
              <td>Batch summary with traceability at /batch-resolution</td>
              <td>
                <span className="ps-badge ps-live">Live</span>
              </td>
            </tr>
          </tbody>
        </table>

        {/* SECTION 2 */}
        <h2 className="ps-h2">2. Internal Dashboards & Tools</h2>
        <table className="ps-table">
          <thead>
            <tr>
              <th>Dashboard</th>
              <th>Route & Password</th>
              <th>Who Uses It</th>
              <th>Purpose</th>
              <th>Key Features</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Admin Panel</td>
              <td>/admin — amar2026</td>
              <td>Platform team</td>
              <td>
                Full platform control — products, aunties, orders, approvals
              </td>
              <td>
                Product management (5 images, variants, pricing), aunty
                approval, order oversight, analytics tab
              </td>
            </tr>
            <tr>
              <td>Maker Dashboard</td>
              <td>/maker-dashboard — amar2026</td>
              <td>Individual aunties</td>
              <td>
                Aunty business management — availability, orders, earnings,
                profile
              </td>
              <td>
                Order tracking, earnings trend, best sellers, personal AI
                insights, profile management (no price editing)
              </td>
            </tr>
            <tr>
              <td>Platform Dashboard</td>
              <td>/platform-dashboard — amar2026</td>
              <td>Platform team</td>
              <td>Business-level KPIs and operational overview</td>
              <td>
                GMV, orders, chef count, Platform Vitality Index, revenue trends
              </td>
            </tr>
            <tr>
              <td>CRM Portal</td>
              <td>
                /crm — crm-admin-2024 / crm-manager-2024 / crm-marketing-2024
              </td>
              <td>CRM & marketing team</td>
              <td>Customer lifecycle management, segmentation, campaigns</td>
              <td>
                Customer segments, CLV, acquisition trends, campaign
                performance, AI insight cards
              </td>
            </tr>
            <tr>
              <td>Analytics Dashboard</td>
              <td>/analytics — amar2026</td>
              <td>Platform team</td>
              <td>Deep data analysis across all dimensions</td>
              <td>
                Revenue, top products, state distribution, aunty performance,
                customer behavior, unit economics, investor reporting
              </td>
            </tr>
            <tr>
              <td>Ads Dashboard</td>
              <td>/ads — amar2026</td>
              <td>Aunties + platform team</td>
              <td>
                Chef advertising — sponsored dish, featured chef, category/city
                promotion
              </td>
              <td>
                Auction-based ad ranking, impressions/clicks/orders/ROAS,
                Sponsored badges on listings
              </td>
            </tr>
            <tr>
              <td>Batch Manager</td>
              <td>/batch-resolution — amar2026</td>
              <td>Platform team</td>
              <td>Ethical batch aggregation and traceability</td>
              <td>
                Batch status, compatibility checks, merge notifications,
                order-to-batch mapping
              </td>
            </tr>
            <tr>
              <td>Aunty Onboarding</td>
              <td>/aunty-onboarding — aunty2024</td>
              <td>Onboarding team (on call)</td>
              <td>
                Capture comprehensive aunty profile data during phone onboarding
              </td>
              <td>
                Name, DOB, family, kitchen photos, social media, product skills,
                bank account, references, stories
              </td>
            </tr>
            <tr>
              <td>Aunty Registry</td>
              <td>/aunty-registry — (public)</td>
              <td>Platform team</td>
              <td>Review, approve, or reject aunty applications</td>
              <td>
                Application list, profile preview, approve/reject workflow
              </td>
            </tr>
            <tr>
              <td>Community Hunter</td>
              <td>/community-hunter — aunty1234</td>
              <td>Marketing team</td>
              <td>Identify online communities for ethical outreach</td>
              <td>
                Simulated data from YouTube/Reddit/Instagram, rule-based
                scoring, outreach action plans
              </td>
            </tr>
          </tbody>
        </table>

        {/* SECTION 3 */}
        <h2 className="ps-h2">3. AI & Intelligence Modules</h2>
        <table className="ps-table">
          <thead>
            <tr>
              <th>Module</th>
              <th>Hub</th>
              <th>AI Type</th>
              <th>Input Data</th>
              <th>Output / Intelligence</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Platform Vitality Index (PVI)</td>
              <td>/intelligence</td>
              <td>
                <span className="ps-badge ps-ai">Composite scoring</span>
              </td>
              <td>
                GMV, retention rate, batch health, quality scores, community
                activity
              </td>
              <td>Single 0-100 health score + 6 sub-scores</td>
            </tr>
            <tr>
              <td>Critical Alerts Engine</td>
              <td>/intelligence</td>
              <td>
                <span className="ps-badge ps-ai">Threshold detection</span>
              </td>
              <td>
                Order volume, GMV trends, aunty dropout, rating changes, refund
                spikes
              </td>
              <td>Severity-coded alerts (Critical/Warning/Info)</td>
            </tr>
            <tr>
              <td>Predictive Models</td>
              <td>/intelligence</td>
              <td>
                <span className="ps-badge ps-ai">Statistical forecasting</span>
              </td>
              <td>
                Historical orders, festival calendar, aunty activity patterns
              </td>
              <td>
                GMV forecast 30/60 days, aunty churn risk, reorder probability,
                demand per SKU
              </td>
            </tr>
            <tr>
              <td>Aunty Intelligence Score (AIS)</td>
              <td>/intelligence</td>
              <td>
                <span className="ps-badge ps-ai">Composite scoring</span>
              </td>
              <td>
                Order completion, ratings, repeat customers, batch contribution,
                response time
              </td>
              <td>
                Per-aunty 0-100 score, Rising Stars list, investment
                recommendations
              </td>
            </tr>
            <tr>
              <td>Batch Demand Forecasting</td>
              <td>/intelligence</td>
              <td>
                <span className="ps-badge ps-ai">Pattern analysis</span>
              </td>
              <td>
                Historical batch data, order timing, SKU demand per region
              </td>
              <td>Optimal batch size, best day to open, fill prediction</td>
            </tr>
            <tr>
              <td>Cultural Calendar Intelligence</td>
              <td>/intelligence</td>
              <td>
                <span className="ps-badge ps-ai">Event-driven rules</span>
              </td>
              <td>
                Indian festival calendar, historical festival-period sales
              </td>
              <td>
                15-day advance flags, demand spike predictions, projected
                revenue per festival
              </td>
            </tr>
            <tr>
              <td>Recipe Authenticity Fingerprint</td>
              <td>/intelligence</td>
              <td>
                <span className="ps-badge ps-ai">Rule-based scoring</span>
              </td>
              <td>
                Ingredient list vs. traditional recipe, prep steps, aunty's
                region vs. dish origin
              </td>
              <td>
                Authenticity score per variant (e.g. "97% authentic Mithila
                recipe")
              </td>
            </tr>
            <tr>
              <td>Customer Taste DNA</td>
              <td>/intelligence + CRM</td>
              <td>
                <span className="ps-badge ps-ai">Silent profiling</span>
              </td>
              <td>
                Order history, product choices, filter selections, timing
                patterns
              </td>
              <td>
                Taste profile per customer, WhatsApp nudge copy, next-order
                prediction
              </td>
            </tr>
            <tr>
              <td>Supply-Demand Heat Brain</td>
              <td>/intelligence</td>
              <td>
                <span className="ps-badge ps-ai">Gap analysis</span>
              </td>
              <td>Customer demand by zone, aunty availability by zone</td>
              <td>
                12-zone grid (red = shortage, blue = idle), aunty recruitment
                briefs for red zones
              </td>
            </tr>
            <tr>
              <td>Aunty Earnings Optimiser</td>
              <td>/intelligence</td>
              <td>
                <span className="ps-badge ps-ai">Optimization model</span>
              </td>
              <td>
                Aunty's current products, market demand, batch frequency,
                pricing
              </td>
              <td>
                Top 3 recommended products, projected monthly earnings
                with/without changes
              </td>
            </tr>
            <tr>
              <td>Quality Drift Detection</td>
              <td>/intelligence</td>
              <td>
                <span className="ps-badge ps-ai">Trend monitoring</span>
              </td>
              <td>Rating history per aunty per product over time</td>
              <td>
                Early warning 6 weeks before customer complaints, flagged
                aunties, intervention prompts
              </td>
            </tr>
            <tr>
              <td>Community-to-Commerce Bridge</td>
              <td>/intelligence</td>
              <td>
                <span className="ps-badge ps-ai">
                  Content-to-product mapping
                </span>
              </td>
              <td>
                Salah-Mashwara community activity (reads, Q&A, festival guides)
              </td>
              <td>
                Converts community engagement into product recommendations
              </td>
            </tr>
            <tr>
              <td>AI Recommendation Engine</td>
              <td>/crm + customer profile</td>
              <td>
                <span className="ps-badge ps-ai">RFM segmentation</span>
              </td>
              <td>
                Purchase history, spice/oil/sweetness/region/season signals
              </td>
              <td>Personalized product suggestions, automation workflows</td>
            </tr>
            <tr>
              <td>Brand Health Score</td>
              <td>/brand-intelligence</td>
              <td>
                <span className="ps-badge ps-ai">Composite scoring</span>
              </td>
              <td>Reviews, ratings, sentiment data, community activity</td>
              <td>Weekly composite brand health score with trend</td>
            </tr>
            <tr>
              <td>Social Listening Dashboard</td>
              <td>/brand-intelligence</td>
              <td>
                <span className="ps-badge ps-ai">Keyword + sentiment</span>
              </td>
              <td>Simulated social mentions (YouTube, Reddit, Instagram)</td>
              <td>Mentions feed with sentiment tagging and trend detection</td>
            </tr>
            <tr>
              <td>Crisis Alert Engine</td>
              <td>/brand-intelligence</td>
              <td>
                <span className="ps-badge ps-ai">Spike detection</span>
              </td>
              <td>Negative mention count, rating drops, complaint volume</td>
              <td>
                Severity-coded crisis alerts (Critical/Warning) for team action
              </td>
            </tr>
            <tr>
              <td>Chat Analysis Engine</td>
              <td>/brand-intelligence</td>
              <td>
                <span className="ps-badge ps-ai">Rule-based NLP tagging</span>
              </td>
              <td>Team-pasted conversation excerpts</td>
              <td>
                Issue type tags, resolution status, sentiment, recurring pattern
                flags
              </td>
            </tr>
            <tr>
              <td>Feedback Analyser</td>
              <td>/brand-intelligence</td>
              <td>
                <span className="ps-badge ps-ai">Categorization</span>
              </td>
              <td>
                Written reviews, delivery complaints, product quality reports,
                ratings
              </td>
              <td>
                Unified feedback inbox tagged by issue type, broken down by
                product/aunty/region
              </td>
            </tr>
            <tr>
              <td>Improvement Matrix</td>
              <td>/brand-intelligence</td>
              <td>
                <span className="ps-badge ps-ai">Priority scoring</span>
              </td>
              <td>Aggregated feedback themes</td>
              <td>
                Auto-populated action board sorted by frequency + business
                impact
              </td>
            </tr>
            <tr>
              <td>Community Scoring</td>
              <td>/community-hunter</td>
              <td>
                <span className="ps-badge ps-ai">Rule-based scoring</span>
              </td>
              <td>
                Simulated community data (platform, audience, engagement, topic
                tags)
              </td>
              <td>
                Relevance score, engagement score, outreach strategy per
                community
              </td>
            </tr>
          </tbody>
        </table>

        {/* SECTION 4 */}
        <h2 className="ps-h2">4. Community Modules</h2>
        <table className="ps-table">
          <thead>
            <tr>
              <th>Module</th>
              <th>Route</th>
              <th>Purpose</th>
              <th>Input</th>
              <th>Output</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Salah-Mashwara</td>
              <td>/salah-mashwara</td>
              <td>
                Standalone intergenerational wisdom community — cooking,
                festivals, parenting, home remedies
              </td>
              <td>Elder registrations, community posts, Q&A submissions</td>
              <td>
                Wisdom Library (11 categories), Festival/Puja guides (6),
                Community Q&A forum
              </td>
            </tr>
            <tr>
              <td>Become an Elder</td>
              <td>/become-an-elder</td>
              <td>Elder registration and verification — anyone can apply</td>
              <td>
                Name, age, region, languages, wisdom areas, bio, 2 references
              </td>
              <td>
                Application submitted for admin review; approved elders get
                Verified Elder badge
              </td>
            </tr>
            <tr>
              <td>Mentor Matching</td>
              <td>/salah-mashwara</td>
              <td>Connects users with elders by language, region, and topic</td>
              <td>User preference: topic, region, language</td>
              <td>Matched elder profiles with contact/session options</td>
            </tr>
            <tr>
              <td>Learning Sessions</td>
              <td>/salah-mashwara</td>
              <td>
                Scheduled knowledge events with WhatsApp registration + external
                video link
              </td>
              <td>Elder-created session details</td>
              <td>
                Event listing with registration button → WhatsApp notification
              </td>
            </tr>
            <tr>
              <td>Community Hunter</td>
              <td>/community-hunter</td>
              <td>
                Internal tool to discover online communities for ethical
                outreach
              </td>
              <td>
                Simulated platform data (YouTube, Reddit, Instagram, Facebook)
              </td>
              <td>Ranked community list with specific outreach action plans</td>
            </tr>
          </tbody>
        </table>

        {/* SECTION 5 */}
        <h2 className="ps-h2">5. Technology Stack</h2>
        <table className="ps-table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Technology</th>
              <th>Purpose</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Backend Language</td>
              <td>Motoko</td>
              <td>
                Smart contract logic running on Internet Computer Protocol (ICP)
              </td>
              <td>Decentralized, serverless, no AWS/GCP dependency</td>
            </tr>
            <tr>
              <td>Blockchain Platform</td>
              <td>Internet Computer (ICP) by DFINITY</td>
              <td>Hosting infrastructure — decentralized cloud</td>
              <td>Canister-based deployment; no traditional server</td>
            </tr>
            <tr>
              <td>Frontend Framework</td>
              <td>React + TypeScript</td>
              <td>All UI components and page rendering</td>
              <td>117+ TypeScript files, 43,000+ lines of code</td>
            </tr>
            <tr>
              <td>Styling</td>
              <td>Tailwind CSS</td>
              <td>Utility-first CSS for all visual design</td>
              <td>Custom OKLCH color tokens; mobile-first responsive design</td>
            </tr>
            <tr>
              <td>UI Components</td>
              <td>shadcn/ui</td>
              <td>
                Pre-built accessible components (buttons, dialogs, tables,
                forms, tabs, charts)
              </td>
              <td>Recharts used for all data visualizations</td>
            </tr>
            <tr>
              <td>State Management</td>
              <td>React hooks (useState, useEffect, useMemo, useCallback)</td>
              <td>Local UI state and data caching</td>
              <td>No Redux; memoization for performance</td>
            </tr>
            <tr>
              <td>Data Persistence</td>
              <td>ICP Backend Canister + localStorage fallback</td>
              <td>Product data, user profiles, orders, analytics</td>
              <td>
                localStorage used for admin product management reliability
              </td>
            </tr>
            <tr>
              <td>Image Pipeline</td>
              <td>Sharp (resize/compress) + ImageManifest.tsx</td>
              <td>
                Optimize images during build; prevent build pipeline from
                pruning assets
              </td>
              <td>All 98 images hardcoded in manifest to prevent deletion</td>
            </tr>
            <tr>
              <td>Build Tool</td>
              <td>Vite</td>
              <td>Frontend bundler and dev server</td>
              <td>Fast HMR, optimized production builds</td>
            </tr>
            <tr>
              <td>Routing</td>
              <td>TanStack Router v1</td>
              <td>Client-side navigation between all 25+ pages</td>
              <td>
                Type-safe routes, dynamic route params (/bihar-product/:id)
              </td>
            </tr>
            <tr>
              <td>Charts & Visualization</td>
              <td>Recharts</td>
              <td>All analytics charts — line, bar, pie, area, composed</td>
              <td>
                Used in Analytics, Intelligence Hub, Brand Intelligence, CRM,
                Maker dashboards
              </td>
            </tr>
            <tr>
              <td>WhatsApp Integration</td>
              <td>WhatsApp URL scheme (wa.me)</td>
              <td>
                Order placement in Phase 1 — pre-filled message to team/aunty
              </td>
              <td>No API; uses web URL with encoded message</td>
            </tr>
            <tr>
              <td>Authentication</td>
              <td>Password-protected routes (client-side)</td>
              <td>Separate access for each dashboard</td>
              <td>OTP simulation for customer login</td>
            </tr>
            <tr>
              <td>Deployment Platform</td>
              <td>Caffeine AI</td>
              <td>Build, deploy, and host on ICP</td>
              <td>Plus plan; custom domain pending</td>
            </tr>
          </tbody>
        </table>

        {/* SECTION 6 */}
        <h2 className="ps-h2">6. Data Architecture</h2>
        <table className="ps-table">
          <thead>
            <tr>
              <th>Entity / Table</th>
              <th>Key Fields</th>
              <th>Relationships</th>
              <th>Used By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>States</td>
              <td>state_id, state_name, culinary_story</td>
              <td>Has many Regions, Products</td>
              <td>State pages, homepage state cards</td>
            </tr>
            <tr>
              <td>Regions</td>
              <td>region_id, state_id, region_name, region_food_story</td>
              <td>Belongs to State; has many Products</td>
              <td>State page regional sections</td>
            </tr>
            <tr>
              <td>Products</td>
              <td>
                product_id, state_id, region_id, product_name, category,
                product_story, 5 images, video_url
              </td>
              <td>Belongs to State+Region; has many Variants</td>
              <td>Product pages, shop listing</td>
            </tr>
            <tr>
              <td>Product Variants (SKUs)</td>
              <td>
                variant_id, product_id, variant_name, batch_size_kg,
                shelf_life_days, price
              </td>
              <td>Belongs to Product; has many Ingredients + Aunties</td>
              <td>Variant pages, order flow</td>
            </tr>
            <tr>
              <td>Ingredients</td>
              <td>ingredient_id, ingredient_name</td>
              <td>Many-to-many with Variants via Recipe Ingredients</td>
              <td>Variant pages (2kg batch ingredient table)</td>
            </tr>
            <tr>
              <td>Recipe Ingredients</td>
              <td>recipe_id, variant_id, ingredient_id, quantity, unit</td>
              <td>Junction table</td>
              <td>Variant ingredient display</td>
            </tr>
            <tr>
              <td>Preparation Steps</td>
              <td>step_id, variant_id, step_number, instruction</td>
              <td>Belongs to Variant</td>
              <td>Variant preparation steps display</td>
            </tr>
            <tr>
              <td>Aunties</td>
              <td>
                aunty_id, name, photo, village, district, state,
                years_experience, bio, rating, badges
              </td>
              <td>Many-to-many with Variants via Aunty-Variant mapping</td>
              <td>Aunty cards, profile pages, variant selection</td>
            </tr>
            <tr>
              <td>Aunty-Variant Mapping</td>
              <td>
                aunty_variant_id, aunty_id, variant_id, price, availability
              </td>
              <td>Junction table</td>
              <td>"Choose Your Aunty" screen</td>
            </tr>
            <tr>
              <td>Reviews</td>
              <td>review_id, aunty_id, customer_id, rating, review_text</td>
              <td>Belongs to Aunty + Customer</td>
              <td>Aunty profiles, quality drift detection</td>
            </tr>
            <tr>
              <td>Customers</td>
              <td>
                customer_id, name, phone, email, taste_profile, loyalty_points,
                tier
              </td>
              <td>Has many Orders, Reviews</td>
              <td>CRM, loyalty, recommendations</td>
            </tr>
            <tr>
              <td>Orders</td>
              <td>
                order_id, customer_id, aunty_id, variant_id, batch_id, status,
                created_at
              </td>
              <td>Belongs to Customer, Aunty, Variant, Batch</td>
              <td>Order tracking, analytics, batch resolution</td>
            </tr>
            <tr>
              <td>Batches</td>
              <td>
                batch_id, variant_id, aunty_id, open_date, close_date, status,
                order_ids
              </td>
              <td>Has many Orders</td>
              <td>Batch Manager, demand forecasting</td>
            </tr>
            <tr>
              <td>Aunty Onboarding Profile</td>
              <td>
                Full profile: DOB, marriage date, family, kitchen photos, social
                media, bank account, skills, references, stories
              </td>
              <td>Links to Aunty record after approval</td>
              <td>Aunty Onboarding form, Aunty Registry</td>
            </tr>
          </tbody>
        </table>

        {/* SECTION 7 */}
        <h2 className="ps-h2">7. All Routes & Access Credentials</h2>
        <table className="ps-table">
          <thead>
            <tr>
              <th>Route</th>
              <th>Page / Tool</th>
              <th>Password</th>
              <th>Access</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>/</td>
              <td>Homepage</td>
              <td>—</td>
              <td>
                <span className="ps-badge ps-live">Public</span>
              </td>
            </tr>
            <tr>
              <td>/state/bihar</td>
              <td>Bihar ki Rasoi — state page</td>
              <td>—</td>
              <td>
                <span className="ps-badge ps-live">Public</span>
              </td>
            </tr>
            <tr>
              <td>/bihar-product/:id</td>
              <td>Product page</td>
              <td>—</td>
              <td>
                <span className="ps-badge ps-live">Public</span>
              </td>
            </tr>
            <tr>
              <td>/bihar-variant/:id</td>
              <td>Variant page + aunty selection</td>
              <td>—</td>
              <td>
                <span className="ps-badge ps-live">Public</span>
              </td>
            </tr>
            <tr>
              <td>/bihar-aunty/:id</td>
              <td>Aunty profile page</td>
              <td>—</td>
              <td>
                <span className="ps-badge ps-live">Public</span>
              </td>
            </tr>
            <tr>
              <td>/shop</td>
              <td>All products shop</td>
              <td>—</td>
              <td>
                <span className="ps-badge ps-live">Public</span>
              </td>
            </tr>
            <tr>
              <td>/makers</td>
              <td>All aunties listing</td>
              <td>—</td>
              <td>
                <span className="ps-badge ps-live">Public</span>
              </td>
            </tr>
            <tr>
              <td>/login</td>
              <td>Customer login / signup</td>
              <td>—</td>
              <td>
                <span className="ps-badge ps-live">Public</span>
              </td>
            </tr>
            <tr>
              <td>/salah-mashwara</td>
              <td>Community wisdom module</td>
              <td>—</td>
              <td>
                <span className="ps-badge ps-live">Public</span>
              </td>
            </tr>
            <tr>
              <td>/become-an-elder</td>
              <td>Elder registration</td>
              <td>—</td>
              <td>
                <span className="ps-badge ps-live">Public</span>
              </td>
            </tr>
            <tr>
              <td>/aunty-registry</td>
              <td>Aunty application listing</td>
              <td>—</td>
              <td>
                <span className="ps-badge ps-live">Public</span>
              </td>
            </tr>
            <tr>
              <td>/admin</td>
              <td>Admin Panel</td>
              <td>amar2026</td>
              <td>
                <span className="ps-badge ps-internal">Internal</span>
              </td>
            </tr>
            <tr>
              <td>/maker-dashboard</td>
              <td>Maker Dashboard</td>
              <td>amar2026</td>
              <td>
                <span className="ps-badge ps-internal">Internal</span>
              </td>
            </tr>
            <tr>
              <td>/platform-dashboard</td>
              <td>Platform Dashboard</td>
              <td>amar2026</td>
              <td>
                <span className="ps-badge ps-internal">Internal</span>
              </td>
            </tr>
            <tr>
              <td>/crm</td>
              <td>CRM Portal</td>
              <td>crm-admin-2024 / crm-manager-2024 / crm-marketing-2024</td>
              <td>
                <span className="ps-badge ps-internal">Internal</span>
              </td>
            </tr>
            <tr>
              <td>/analytics</td>
              <td>Analytics Dashboard</td>
              <td>amar2026</td>
              <td>
                <span className="ps-badge ps-internal">Internal</span>
              </td>
            </tr>
            <tr>
              <td>/ads</td>
              <td>Ads Dashboard</td>
              <td>amar2026</td>
              <td>
                <span className="ps-badge ps-internal">Internal</span>
              </td>
            </tr>
            <tr>
              <td>/batch-resolution</td>
              <td>Batch Manager</td>
              <td>amar2026</td>
              <td>
                <span className="ps-badge ps-internal">Internal</span>
              </td>
            </tr>
            <tr>
              <td>/aunty-onboarding</td>
              <td>Aunty Onboarding Form</td>
              <td>aunty2024</td>
              <td>
                <span className="ps-badge ps-internal">Internal</span>
              </td>
            </tr>
            <tr>
              <td>/community-hunter</td>
              <td>Community Hunter Tool</td>
              <td>aunty1234</td>
              <td>
                <span className="ps-badge ps-internal">Internal</span>
              </td>
            </tr>
            <tr>
              <td>/intelligence</td>
              <td>Intelligence Hub (12 AI modules)</td>
              <td>amar2026</td>
              <td>
                <span className="ps-badge ps-internal">Internal</span>
              </td>
            </tr>
            <tr>
              <td>/brand-intelligence</td>
              <td>Brand & Content Intelligence Hub</td>
              <td>amar2026</td>
              <td>
                <span className="ps-badge ps-internal">Internal</span>
              </td>
            </tr>
            <tr>
              <td>/platform-summary</td>
              <td>This document</td>
              <td>—</td>
              <td>
                <span className="ps-badge ps-internal">Internal</span>
              </td>
            </tr>
          </tbody>
        </table>

        {/* SECTION 8 */}
        <h2 className="ps-h2">8. Next to Build — Section-wise Roadmap</h2>
        <table className="ps-table">
          <thead>
            <tr>
              <th>Section</th>
              <th>What to Build Next</th>
              <th>Why / Business Value</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Marketplace Expansion</strong>
              </td>
              <td>
                Add 3–5 more state modules (UP, Maharashtra, Rajasthan, Bengal,
                Gujarat) with full SKU catalogs
              </td>
              <td>Broadens audience; each new state is a new market</td>
              <td>
                <span className="ps-badge ps-live">High</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Payment Integration</strong>
              </td>
              <td>
                Stripe payment gateway for digital payments (UPI, card)
                replacing WhatsApp-only ordering
              </td>
              <td>Enables real revenue flow, reduces manual order handling</td>
              <td>
                <span className="ps-badge ps-live">High</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Real Order Management</strong>
              </td>
              <td>
                End-to-end order lifecycle with real backend — order creation,
                payment, chef acceptance, delivery tracking
              </td>
              <td>
                Currently orders go via WhatsApp; need proper system for scale
              </td>
              <td>
                <span className="ps-badge ps-live">High</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Domain & Production</strong>
              </td>
              <td>
                Connect www.choudharyaunty.com — repurchase within Caffeine or
                resolve via support
              </td>
              <td>Professional credibility; essential for launch</td>
              <td>
                <span className="ps-badge ps-live">High</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Backend Persistence</strong>
              </td>
              <td>
                Move product/order data from localStorage to real ICP backend
                canister storage
              </td>
              <td>
                Products saved to localStorage will be lost on browser clear;
                need real persistence
              </td>
              <td>
                <span className="ps-badge ps-live">High</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Analytics — Live Data</strong>
              </td>
              <td>
                Connect all analytics dashboards to real order/revenue data
                instead of simulated data
              </td>
              <td>
                Currently all charts show mock data; needs real data pipeline
                for business decisions
              </td>
              <td>
                <span className="ps-badge ps-live">High</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Aunty Central (Separate App)</strong>
              </td>
              <td>
                Extract Maker Dashboard into a dedicated "Aunty Central" app
                with its own URL and branding
              </td>
              <td>
                Better UX for aunties; cleaner separation from consumer app
                (like Zomato Partner)
              </td>
              <td>
                <span className="ps-badge ps-next">Medium</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Notification System</strong>
              </td>
              <td>
                Email/WhatsApp notifications for order confirmation, batch
                updates, festival reminders, aunty nudges
              </td>
              <td>
                Reduces manual team communication; automates key customer
                touchpoints
              </td>
              <td>
                <span className="ps-badge ps-next">Medium</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Product Reviews & Ratings</strong>
              </td>
              <td>
                Real customer review submission on delivered orders;
                verified-purchase badge
              </td>
              <td>
                Currently reviews are mock data; real reviews build trust and
                feed Quality Drift Detection
              </td>
              <td>
                <span className="ps-badge ps-next">Medium</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Delivery & Logistics</strong>
              </td>
              <td>
                Delivery partner integration, real-time order tracking, address
                management, delivery zone mapping
              </td>
              <td>
                Core operational requirement before scaling beyond WhatsApp
                orders
              </td>
              <td>
                <span className="ps-badge ps-next">Medium</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Salah-Mashwara Phase 2</strong>
              </td>
              <td>
                Video session scheduling with Zoom embed, elder verification
                workflow, knowledge contribution rewards
              </td>
              <td>
                Deepen community engagement; monetize community-to-commerce
                bridge
              </td>
              <td>
                <span className="ps-badge ps-next">Medium</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Mobile App (PWA)</strong>
              </td>
              <td>
                Progressive Web App — installable on phone, offline support,
                push notifications
              </td>
              <td>
                Better mobile experience; 80%+ of Indian users are mobile-first
              </td>
              <td>
                <span className="ps-badge ps-next">Medium</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Intelligence Hub — Live Feeds</strong>
              </td>
              <td>
                Connect AIS, Quality Drift, Batch Forecasting to real order and
                review data
              </td>
              <td>
                AI modules currently run on simulated data; real data makes them
                actionable
              </td>
              <td>
                <span className="ps-badge ps-next">Medium</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Investor Dashboard</strong>
              </td>
              <td>
                Dedicated read-only investor reporting view with GMV, cohort
                retention, unit economics, growth metrics
              </td>
              <td>Required for fundraising; clean narrative for investors</td>
              <td>
                <span className="ps-badge ps-next">Medium</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Gift Hampers</strong>
              </td>
              <td>
                Curated gift product bundling, gifting flow, gifter/recipient
                address management
              </td>
              <td>
                Strong festival revenue opportunity (Diwali, Raksha Bandhan) —
                removed in Phase 1
              </td>
              <td>
                <span className="ps-badge ps-next">Medium</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Subscription / Tiffin Plan</strong>
              </td>
              <td>
                Weekly/monthly subscription ordering — regular tiffin-style
                recurring orders from a chosen aunty
              </td>
              <td>
                Predictable recurring revenue; stronger aunty earnings stability
              </td>
              <td>
                <span className="ps-badge ps-next">Medium</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Ambassador Program</strong>
              </td>
              <td>
                Build the Ambassador application and management system
                (currently just a homepage section)
              </td>
              <td>Referral-based aunty acquisition; community-driven growth</td>
              <td>
                <span className="ps-badge">Low</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Multi-language Support</strong>
              </td>
              <td>
                Hindi UI option for aunties who are not comfortable in English
              </td>
              <td>Critical for onboarding rural/semi-urban aunties at scale</td>
              <td>
                <span className="ps-badge ps-next">Medium</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Brand Intelligence — Social API</strong>
              </td>
              <td>
                Replace simulated social feed with real social listening when
                APIs become available
              </td>
              <td>
                Real brand monitoring; currently relies on manual input and
                simulation
              </td>
              <td>
                <span className="ps-badge">Low</span>
              </td>
            </tr>
          </tbody>
        </table>

        <p className="ps-footer">
          Choudhary Aunty Platform Summary &nbsp;|&nbsp; Generated March 2026
          &nbsp;|&nbsp; Confidential — Internal Use Only
        </p>
      </div>
    </>
  );
}
