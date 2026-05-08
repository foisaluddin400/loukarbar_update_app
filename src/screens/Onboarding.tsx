import React, { useState } from 'react';
import {
  View, ScrollView, StyleSheet, Pressable, SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors } from '../constants/colors';
import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';
import { AppTextInput } from '../components/ui/AppTextInput';
import { RootStackParamList } from '../types';

type Nav = StackNavigationProp<RootStackParamList>;

interface FormData {
  name: string;
  city: string;
  startDate: string;
  longDistance: boolean;
}

export const Onboarding: React.FC = () => {
  const nav = useNavigation<Nav>();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({
    name: '', city: '', startDate: '', longDistance: true,
  });

  const steps = [
    {
      kicker: 'Question 01',
      title: 'What shall we call you?',
      sub: 'This is your name inside the journal.',
      body: (
        <AppTextInput
          label="First name" n="01"
          value={data.name}
          onChangeText={v => setData(d => ({ ...d, name: v }))}
          placeholder="Lou"
        />
      ),
    },
    {
      kicker: 'Question 02',
      title: 'And your city?',
      sub: 'For nearby date ideas and local context.',
      body: (
        <AppTextInput
          label="Current city" n="02"
          value={data.city}
          onChangeText={v => setData(d => ({ ...d, city: v }))}
          placeholder="Los Angeles"
        />
      ),
    },
     {
      kicker: 'Question 03',
      title: 'And your city?',
      sub: 'For nearby date ideas and local context.',
      body: (
        <AppTextInput
          label="Current city" n="03"
          value={data.city}
          onChangeText={v => setData(d => ({ ...d, city: v }))}
          placeholder="Los Angeles"
        />
      ),
    },
    {
      kicker: 'Question 04',
      title: 'Across a distance?',
      sub: "We'll enable the reunion countdown if so.",
      body: (
        <View>
          {[
            { k: true, l: 'Yes — we\'re apart', sub: 'Enable reunion countdown' },
            { k: false, l: 'No — we\'re together', sub: 'Skip the countdown' },
          ].map(o => (
            <Pressable
              key={String(o.k)}
              onPress={() => setData(d => ({ ...d, longDistance: o.k }))}
              style={[styles.optionRow, { opacity: o.k === data.longDistance ? 1 : 0.6 }]}
            >
              <View style={{ flex: 1 }}>
                <AppText variant="heading" size={18}>{o.l}</AppText>
                <AppText variant="mono" color={Colors.light} style={{ fontSize: 10, marginTop: 2 }}>
                  {o.sub.toUpperCase()}
                </AppText>
              </View>
              <AppText size={18} color={o.k === data.longDistance ? Colors.accent : Colors.rule}>
                {o.k === data.longDistance ? '●' : '○'}
              </AppText>
            </Pressable>
          ))}
        </View>
      ),
    },
    {
      kicker: 'Question 05',
      title: 'Invite your partner',
      sub: 'For nearby date ideas and local context.',
      body: (
        <AppTextInput
          label="Current city" n="03"
          value={data.city}
          onChangeText={v => setData(d => ({ ...d, city: v }))}
          placeholder="Los Angeles"
        />
      ),
    },
  ];

  const cur = steps[step];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.topBar}>
          <AppText variant="smallCaps" color={Colors.muted}>◇  BEGINNING</AppText>
          <AppText variant="mono" color={Colors.light} style={{ fontSize: 10 }}>
            {String(step + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
          </AppText>
        </View>

        {/* Step content */}
        <View style={styles.content}>
          <AppText variant="smallCaps" color={Colors.accent} style={{ marginBottom: 14 }}>
            {cur.kicker}
          </AppText>
          <AppText variant="display" size={42} style={{ lineHeight: 42, marginBottom: 14 }}>
            {cur.title}
          </AppText>
          <AppText variant="serifItalic" size={18} color={Colors.muted} style={{ marginBottom: 36, lineHeight: 27 }}>
            {cur.sub}
          </AppText>
          {cur.body}
        </View>

        {/* Progress bars */}
        <View style={styles.progress}>
          {steps.map((_, i) => (
            <View
              key={i}
              style={[styles.progressBar, { backgroundColor: i <= step ? Colors.accent : Colors.rule }]}
            />
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          {step > 0 && (
            <AppButton variant="outline" size="lg" onPress={() => setStep(s => s - 1)} style={{ flex: 1 }}>
              Back
            </AppButton>
          )}
          <AppButton
            variant="solid"
            size="lg"
            style={{ flex: step > 0 ? 2 : 1 }}
            onPress={() => step < steps.length - 1 ? setStep(s => s + 1) : nav.navigate('AlignedApp')}
          >
            {step === steps.length - 1 ? 'Enter →' : 'Continue'}
          </AppButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bone },
  container: { flexGrow: 1, padding: 32 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48 },
  content: { flex: 1 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.rule,
    gap: 12,
  },
  progress: { flexDirection: 'row', gap: 4, marginBottom: 18 },
  progressBar: { flex: 1, height: 2, borderRadius: 1 },
  actions: { flexDirection: 'row', gap: 10 },
});