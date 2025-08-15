# Bolt Expo Starter - Enhanced App

A comprehensive React Native Expo app with beautiful UI components, smooth animations, and modern design patterns.

## ✨ Features

### 🏠 Enhanced Home Screen
- **Welcome Section**: Personalized greeting with user name
- **Quick Actions**: Interactive cards for common tasks (Start Learning, Set Goal, View Progress)
- **Progress Dashboard**: Visual progress cards with animated progress bars
- **Loading Animations**: Beautiful loading states and animations
- **Floating Action Button**: Expandable FAB with quick actions
- **Notification System**: Toast notifications for user feedback

### 📊 Activity Feed
- **Filterable Activities**: Filter by achievements, goals, milestones, and reminders
- **Interactive Cards**: Animated activity cards with like/comment interactions
- **Timeline View**: Chronological display of user activities
- **Rich Content**: Icons, timestamps, and engagement metrics

### 👤 Comprehensive Profile
- **User Avatar**: Profile picture with edit functionality
- **Level System**: Experience points and level progression
- **Statistics Grid**: Key metrics (Days Active, Points Earned, Goals Completed, Study Hours)
- **Achievements**: Unlockable achievements with progress tracking
- **Quick Actions**: Settings, Share Profile, Support options

### ⚙️ Advanced Settings
- **Organized Sections**: Notifications, Appearance, Privacy & Security, Data & Storage, Support, Account
- **Interactive Toggles**: Switch components for boolean settings
- **Navigation Items**: Settings that lead to sub-screens
- **Action Items**: Destructive actions with confirmation dialogs
- **Modern Design**: Clean, organized interface with proper spacing

### 🎨 Design System
- **Consistent Colors**: Primary (#6366f1), Success (#10b981), Warning (#f59e0b), Error (#ef4444)
- **Typography**: Hierarchical text styles with proper weights and sizes
- **Shadows & Elevation**: Subtle shadows for depth and visual hierarchy
- **Border Radius**: Consistent rounded corners throughout the app
- **Animations**: Smooth spring animations for interactions

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bolt-expo-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press 'i' for iOS Simulator
   - Press 'a' for Android Emulator

## 📱 App Structure

```
app/
├── _layout.tsx              # Root layout with navigation
├── (tabs)/
│   ├── _layout.tsx          # Tab navigation layout
│   ├── index.tsx            # Enhanced home screen
│   ├── activity.tsx         # Activity feed with filters
│   ├── profile.tsx          # User profile with stats
│   └── settings.tsx         # Comprehensive settings
components/
├── LoadingDemo.tsx          # Loading animations showcase
├── NotificationBanner.tsx   # Toast notification component
└── FloatingActionButton.tsx # Expandable FAB component
```

## 🎯 Key Components

### NotificationBanner
- **Types**: Success, Warning, Error, Info
- **Auto-hide**: Configurable duration
- **Animations**: Smooth slide-in/out with spring animations
- **Customizable**: Colors, icons, and styling

### FloatingActionButton
- **Expandable**: Shows/hides quick action buttons
- **Smooth Animations**: Spring-based transitions
- **Quick Actions**: Goal setting, learning, progress viewing
- **Accessible**: Proper touch targets and feedback

### Activity Cards
- **Interactive**: Press animations and feedback
- **Rich Content**: Icons, timestamps, engagement metrics
- **Filterable**: Multiple activity types
- **Responsive**: Adapts to content length

### Progress Cards
- **Visual Progress**: Animated progress bars
- **Key Metrics**: Important user statistics
- **Color-coded**: Different colors for different metrics
- **Interactive**: Press feedback and animations

## 🎨 Design Principles

### Color Palette
- **Primary**: #6366f1 (Indigo)
- **Success**: #10b981 (Emerald)
- **Warning**: #f59e0b (Amber)
- **Error**: #ef4444 (Red)
- **Neutral**: #1e293b, #64748b, #9ca3af

### Typography
- **Headings**: 32px, 28px, 24px, 20px with 800 weight
- **Body**: 16px, 14px with 600/400 weights
- **Captions**: 12px for secondary information

### Spacing
- **Container**: 20px horizontal padding
- **Cards**: 16px internal padding
- **Elements**: 8px, 12px, 16px, 24px gaps

### Animations
- **Spring**: Natural, bouncy animations for interactions
- **Timing**: Smooth transitions for state changes
- **Scale**: Subtle scale effects for press feedback
- **Opacity**: Fade in/out for smooth transitions

## 🔧 Customization

### Adding New Features
1. Create new components in the `components/` directory
2. Add new screens in `app/(tabs)/` or create new route groups
3. Update navigation in `app/(tabs)/_layout.tsx`
4. Follow the established design patterns

### Styling
- Use the existing color palette and typography
- Follow the spacing guidelines
- Implement consistent border radius (12px, 16px)
- Add appropriate shadows for depth

### Animations
- Use `react-native-reanimated` for smooth animations
- Implement spring animations for natural feel
- Add press feedback for interactive elements
- Use consistent animation durations

## 📦 Dependencies

### Core
- **Expo**: ^53.0.0
- **React Native**: 0.79.1
- **React**: 19.0.0

### Navigation
- **Expo Router**: ~5.0.2
- **React Navigation**: ^7.0.14

### UI & Animations
- **React Native Reanimated**: ~3.17.4
- **Lucide React Native**: ^0.475.0
- **Expo Linear Gradient**: ~14.1.3

### Icons & Graphics
- **Expo Vector Icons**: ^14.1.0
- **React Native SVG**: 15.11.2

## 🚀 Performance

- **Optimized Animations**: Using Reanimated 3 for 60fps animations
- **Efficient Rendering**: Proper use of React.memo and useCallback
- **Lazy Loading**: Components loaded only when needed
- **Memory Management**: Proper cleanup of animations and timers

## 📱 Platform Support

- **iOS**: Full support with native animations
- **Android**: Full support with Material Design principles
- **Web**: Responsive design with web-optimized interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style and patterns
4. Add appropriate animations and interactions
5. Test on both iOS and Android
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using Expo and React Native**