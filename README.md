# Walking Challenge App

A comprehensive React Native Expo app for tracking steps, joining walking challenges, and building healthy communities. Connect with fitness devices, compete with friends, and stay motivated to achieve your daily walking goals.

## 🚶‍♂️ Features

### 📱 Step Tracking & Health Integration
- **Real-time Step Counting**: Connect with Apple Health, Google Fit, and fitness devices
- **Automatic Data Sync**: Seamless integration with iWatch, Fitbit, and other fitness apps
- **Health Permissions**: Secure access to health data for accurate step tracking
- **Manual Entry Prevention**: Steps cannot be manually entered to ensure authenticity
- **Daily Goals**: Set and track personalized daily step targets
- **Progress Visualization**: Beautiful charts and progress bars

### 👤 User Registration & Authentication
- **Individual Registration**: Complete user profiles with personal information
  - Name, email, phone number
  - Date of birth and gender
  - Company/organization selection
  - Secure password creation
- **Company Registration**: Organizations can register for community challenges
  - University, school, gated community, office support
  - Complete address and contact information
  - Admin approval system
- **Admin Login**: Special access for challenge creators and administrators
- **Multi-type Authentication**: Individual, company, and admin login options

### 🏆 Walking Challenges
- **Daily Challenges**: 10K steps, morning walks, weekend warriors
- **Weekly Challenges**: Extended goals with weekly targets
- **Monthly Challenges**: Long-term commitments like monthly marathons
- **Community Challenges**: Collaborative goals across organizations
- **Progress Tracking**: Real-time progress monitoring with visual indicators
- **Rewards System**: Badges, trophies, and achievements for motivation
- **Leaderboards**: Competitive rankings within communities

### 👥 Community Features
- **Community Overview**: Total members, steps, and challenge statistics
- **Member Profiles**: Detailed user profiles with achievements and levels
- **Company Groups**: Filter members by organization
- **Social Interactions**: Like, message, and share achievements
- **Online Status**: Real-time online indicators
- **Ranking System**: Competitive leaderboards with medals

### ⚙️ Admin Panel
- **Challenge Management**: Create and manage walking challenges
- **Company Approval**: Review and approve company registrations
- **Community Oversight**: Monitor community statistics and engagement
- **User Management**: Administer user accounts and permissions

### 🎨 Design & UX
- **Modern Interface**: Clean, intuitive design with smooth animations
- **Responsive Design**: Optimized for all screen sizes
- **Dark Mode Support**: Comfortable viewing in any lighting
- **Accessibility**: Inclusive design for all users
- **Smooth Animations**: React Native Reanimated for 60fps animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)
- Physical device for health data testing

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd walking-challenge-app
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

### Health Data Setup

#### iOS
- Enable Health app permissions in Settings
- Grant step counting and distance tracking access
- Connect with Apple Watch for enhanced accuracy

#### Android
- Enable Google Fit integration
- Grant activity recognition permissions
- Connect with fitness devices via Google Fit

## 📱 App Structure

```
app/
├── _layout.tsx              # Root layout with navigation
├── login.tsx                # Multi-type login screen
├── signup-individual.tsx    # Individual user registration
├── signup-company.tsx       # Company registration
├── (tabs)/
│   ├── _layout.tsx          # Tab navigation layout
│   ├── index.tsx            # Home screen with step tracking
│   ├── challenges.tsx       # Walking challenges
│   ├── community.tsx        # Community features
│   └── settings.tsx         # App settings
components/
├── StepTracker.tsx          # Step tracking component
├── NotificationBanner.tsx   # Toast notifications
└── FloatingActionButton.tsx # Quick actions FAB
```

## 🎯 Key Components

### StepTracker
- **Health Integration**: Connects with device health data
- **Real-time Updates**: Live step counting and progress
- **Goal Tracking**: Daily step targets with progress visualization
- **Statistics**: Distance, calories, active time calculations
- **Animations**: Smooth progress bars and loading states

### Authentication System
- **Multi-type Login**: Individual, company, and admin options
- **Form Validation**: Comprehensive input validation
- **Secure Storage**: Encrypted credential storage
- **Password Security**: Strong password requirements

### Challenge Management
- **Challenge Types**: Daily, weekly, monthly, and special challenges
- **Progress Tracking**: Real-time progress monitoring
- **Reward System**: Badges and achievements
- **Status Management**: Active, completed, and upcoming challenges

### Community Features
- **Member Profiles**: Detailed user information and stats
- **Social Interactions**: Like, message, and share functionality
- **Filtering**: Filter by company, friends, or leaders
- **Online Status**: Real-time presence indicators

## 🎨 Design System

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

## 📦 Dependencies

### Core
- **Expo**: ^53.0.0
- **React Native**: 0.79.1
- **React**: 19.0.0

### Health & Sensors
- **Expo Health**: ~1.0.0
- **Expo Sensors**: ~14.1.3
- **Expo Location**: ~18.1.2
- **Expo Device**: ~7.1.2

### Navigation & UI
- **Expo Router**: ~5.0.2
- **React Navigation**: ^7.0.14
- **React Native Reanimated**: ~3.17.4
- **Lucide React Native**: ^0.475.0

### Storage & Security
- **Expo Secure Store**: ~14.1.3
- **Expo SQLite**: ~14.1.3
- **Async Storage**: 1.23.1

## 🔧 Configuration

### Health Permissions
The app requires specific permissions for health data access:

#### iOS (Info.plist)
```xml
<key>NSHealthShareUsageDescription</key>
<string>This app needs access to health data to track your steps and walking progress.</string>
<key>NSHealthUpdateUsageDescription</key>
<string>This app needs permission to update health data for step tracking.</string>
```

#### Android (AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

## 🚀 Performance

- **Optimized Animations**: Using Reanimated 3 for 60fps animations
- **Efficient Health Data**: Minimal battery impact from health monitoring
- **Lazy Loading**: Components loaded only when needed
- **Memory Management**: Proper cleanup of animations and timers
- **Background Sync**: Efficient data synchronization

## 📱 Platform Support

- **iOS**: Full support with HealthKit integration
- **Android**: Full support with Google Fit integration
- **Web**: Responsive design with web-optimized interactions
- **Fitness Devices**: Apple Watch, Fitbit, Garmin, and more

## 🔒 Security & Privacy

- **Health Data**: Secure access to device health information
- **User Privacy**: No manual step entry to prevent cheating
- **Data Encryption**: Secure storage of user credentials
- **Permission Management**: Granular control over data access
- **GDPR Compliance**: User data protection and control

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style and patterns
4. Add appropriate animations and interactions
5. Test on both iOS and Android
6. Ensure health data integration works correctly
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Review health permission settings
- Ensure device compatibility
- Test with physical devices for health data

---

**Built with ❤️ using Expo and React Native**

*Step into a healthier future with Walking Challenge App! 🚶‍♂️✨*