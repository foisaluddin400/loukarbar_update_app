import React, { useEffect } from 'react';
import {
  Modal,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { AppText } from './AppText';
import { AppButton } from './AppButton';

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  kicker?: string;
  height?: number | string;
  dark?: boolean;
  children: React.ReactNode;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  title,
  kicker,
  dark = false,
  children,
}) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);

  useEffect(() => {
    if (open) {
      translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT);
    }
  }, [open]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!open) return null;

  const bg = dark ? Colors.ink : Colors.bone;
  const textColor = dark ? Colors.bone : Colors.ink;
  const subtleColor = dark ? 'rgba(244,238,228,0.1)' : Colors.rule;

  return (
    <Modal transparent visible={open} animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <Animated.View style={[styles.sheet, { backgroundColor: bg }, animatedStyle]}>
          {/* Handle */}
          <View style={styles.handleContainer}>
            <View style={[styles.handle, { backgroundColor: subtleColor }]} />
          </View>

          {/* Header */}
          <View style={[styles.header, { borderBottomColor: subtleColor }]}>
            <View style={{ flex: 1 }}>
              {kicker && (
                <AppText variant="smallCaps" color={dark ? Colors.light : Colors.muted} style={{ marginBottom: 4 }}>
                  {kicker}
                </AppText>
              )}
              <AppText variant="heading" size={26} color={textColor}>{title}</AppText>
            </View>
            <AppButton variant="ghost" size="sm" onPress={onClose} textStyle={{ color: dark ? Colors.light : Colors.muted }}>
              Close
            </AppButton>
          </View>

          {/* Content */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(26,22,20,0.6)',
  },
  sheet: {
    maxHeight: '88%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  handleContainer: { alignItems: 'center', paddingTop: 12 },
  handle: { width: 32, height: 3, borderRadius: 2 },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
    borderBottomWidth: 1,
    gap: 12,
  },
  content: { padding: 20, paddingBottom: 32 },
});