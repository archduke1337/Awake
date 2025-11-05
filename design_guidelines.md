# AWAKE Chatbot - Design Guidelines

## Design Approach
**System-Based Approach**: Using Material Design principles adapted for a modern chat application, prioritizing clarity, efficiency, and professional aesthetics. Drawing inspiration from Linear's clean typography and Notion's spatial organization.

## Core Design Principles
1. **Clarity First**: Every interface element serves a clear purpose
2. **Conversation-Focused**: Design removes friction from the chat experience
3. **Professional & Modern**: Clean, trustworthy appearance suitable for AI interaction
4. **Efficient Navigation**: Minimal clicks to core functionality

---

## Layout System

### Primary Structure
- **Two-column layout** (desktop): 280px fixed sidebar + fluid chat area
- **Single column** (mobile): Collapsible sidebar with hamburger menu
- **Spacing Units**: Use Tailwind spacing of **2, 4, 6, 8, 12, 16, 24** for consistency

### Chat Area Layout
- Full-height container with message scroll area
- Fixed input bar anchored to bottom with subtle shadow
- Message area: `max-w-3xl mx-auto` for optimal reading width
- Generous padding: `px-6 md:px-8` on chat container

### Sidebar Layout
- User profile section at top (Clerk UserButton + username)
- Model selector dropdown prominently positioned
- Chat history list (scrollable)
- New chat button at bottom
- Padding: `p-6` throughout

---

## Typography

### Font Stack
- **Primary**: Inter (Google Fonts) - clean, highly legible
- **Code/Model Names**: JetBrains Mono - for technical content

### Hierarchy
- **Page Title**: text-2xl font-semibold
- **Section Headers**: text-lg font-medium
- **Body Text**: text-base (chat messages, descriptions)
- **Metadata**: text-sm text-gray-600 (timestamps, model names)
- **Small Labels**: text-xs uppercase tracking-wide font-medium

### Chat-Specific Typography
- **User Messages**: text-base font-normal
- **AI Messages**: text-base with slightly increased line-height (leading-relaxed)
- **Code Blocks**: JetBrains Mono, text-sm with syntax highlighting

---

## Component Library

### Chat Messages
- **User Messages**: Right-aligned, max-width 70%, rounded corners (rounded-2xl), distinct visual treatment
- **AI Messages**: Left-aligned, max-width 85%, rounded corners (rounded-2xl), includes model badge
- **Message Spacing**: gap-6 between messages
- **Timestamp**: Small text below each message, subtle appearance
- **Avatar/Badge**: Small circular indicator showing user vs AI

### Model Selector
- **Dropdown Component**: Full-width in sidebar
- **Model Card Display**: 
  - Model name (font-medium)
  - Provider badge (small pill)
  - Context length info (text-sm)
- **Selected State**: Clear visual indicator with accent border
- **Search/Filter**: Integrated search bar within dropdown

### Input Area
- **Height**: Fixed at 80px (adjusts for multi-line)
- **Input Field**: Large textarea with rounded-2xl corners, shadow-sm
- **Send Button**: Icon button (paper plane), positioned bottom-right of input
- **Character Counter**: Optional, text-xs in corner
- **Padding**: p-4 around input field

### Authentication Components
- **Sign-in Screen**: Centered card, max-w-md, with Clerk's default styling
- **User Button**: Positioned top-right of sidebar with name label
- **Protected Route Indicator**: Subtle locked icon for unauthenticated users

### Navigation & Controls
- **New Chat Button**: Full-width, rounded-lg, prominent placement
- **Chat History Items**: List with hover states, truncated text, timestamps
- **Settings/Menu**: Icon buttons with tooltips

---

## Spacing & Rhythm

### Vertical Spacing
- **Section Gaps**: space-y-8 for major sections
- **Component Gaps**: space-y-4 for related elements
- **Message List**: gap-6 between chat bubbles
- **Sidebar Items**: gap-2 for list items

### Padding Strategy
- **Containers**: px-6 md:px-8 for main content
- **Cards/Components**: p-4 to p-6 depending on hierarchy
- **Buttons**: px-4 py-2 for standard, px-6 py-3 for primary actions

---

## Animations

Use sparingly for polish, not distraction:
- **Message Appearance**: Subtle fade-in + slide-up (100ms) as messages arrive
- **Dropdown Menus**: Smooth expand/collapse (200ms ease)
- **Hover States**: Quick transitions (150ms) on interactive elements
- **Loading States**: Pulsing dots for AI thinking indicator

---

## Interaction Patterns

### Chat Flow
1. User types in fixed bottom input
2. Send triggers immediate message append
3. AI thinking indicator appears
4. AI response streams in (optional: word-by-word reveal)
5. Auto-scroll to latest message

### Model Selection
1. Click dropdown in sidebar
2. Search/filter available models
3. Select model → dropdown closes, selection persists
4. Selected model badge appears in sidebar header

### Authentication Flow
1. Unauthenticated: Show sign-in card in center
2. Click "Sign In" → Clerk modal appears
3. Post-auth: Redirect to chat interface
4. UserButton always accessible in sidebar

---

## Key Design Details

- **Elevation**: Use subtle shadows (shadow-sm, shadow-md) sparingly
- **Borders**: 1px borders in neutral tones for separation, not emphasis
- **Rounded Corners**: Consistent rounding (rounded-lg for containers, rounded-2xl for chat bubbles)
- **Focus States**: Clear outline-2 outline-offset-2 for keyboard navigation
- **Empty States**: Centered illustrations with helpful prompts ("Start a conversation...")
- **Error States**: Inline error messages below input, toast notifications for system errors

---

## Responsive Behavior

### Desktop (≥1024px)
- Sidebar always visible (280px)
- Chat area fills remaining space
- Input bar: full-width within max-w-3xl constraint

### Tablet (768px-1023px)
- Collapsible sidebar with overlay
- Chat area full-width
- Input bar remains full-width

### Mobile (<768px)
- Hamburger menu for sidebar
- Full-screen chat interface
- Simplified model selector (modal instead of dropdown)
- Larger touch targets (min 44px height)

---

## Images
**No hero images** - This is a functional chat application, not a landing page. Focus remains on the conversation interface without distracting visual elements.