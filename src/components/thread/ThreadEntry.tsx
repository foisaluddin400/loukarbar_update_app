import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { AppText } from '../ui/AppText';
import { ThreadEntry as TEntry } from '../../types';
import { Config } from '../../constants/config';

interface ThreadEntryProps {
  entry: TEntry;
}

const LABEL: Record<string, string> = {
  letter: 'Letter', voice: 'Voice', photo: 'Photograph',
  prompt: 'Prompt', appreciation: 'Appreciation', checkin: 'Check-in',
};

export const ThreadEntryCard: React.FC<ThreadEntryProps> = ({ entry: t }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <AppText variant="smallCaps" color={Colors.accent}>{LABEL[t.type]?.toUpperCase()}</AppText>
      <AppText variant="mono" style={{ fontSize: 9 }}>{t.date.toUpperCase()} · {t.time}</AppText>
    </View>

    {t.type === 'letter' && (
      <View style={styles.letterBox}>
        <AppText size={42} color={Colors.accent} style={styles.openQuote}>"</AppText>
        <AppText variant="serifItalic" size={17} color={Colors.ink} style={{ lineHeight: 27, paddingTop: 6 }}>
          {t.text}
        </AppText>
        <View style={[styles.letterFooter, styles.border]}>
          <AppText variant="serifItalic" size={20} color={Colors.accent}>
            — {Config.DEMO_USERS[t.from].name}
          </AppText>
          <AppText variant="mono" style={{ fontSize: 9 }}>{t.time}</AppText>
        </View>
      </View>
    )}

    {t.type === 'appreciation' && (
      <View style={styles.appreciationBox}>
        <AppText variant="serifItalic" size={18} color={Colors.ink} style={{ lineHeight: 28 }}>
          {t.text}
        </AppText>
        <AppText variant="mono" color={Colors.muted} style={{ fontSize: 10, marginTop: 6 }}>
          — {Config.DEMO_USERS[t.from].name.toUpperCase()} · APPRECIATION
        </AppText>
      </View>
    )}

    {t.type === 'checkin' && (
      <View style={styles.checkinBox}>
        <View style={styles.checkinHeader}>
          <AppText variant="smallCaps" color={Colors.muted}>◈ CHECK-IN</AppText>
        </View>
        {t.feeling && (
          <View style={styles.checkinField}>
            <AppText variant="mono" color={Colors.accent} style={{ fontSize: 9, marginBottom: 4 }}>FEELING</AppText>
            <AppText variant="serifItalic" size={14} color={Colors.ink} style={{ lineHeight: 21 }}>{t.feeling}</AppText>
          </View>
        )}
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
    borderTopWidth: 1,
    borderTopColor: Colors.rule,
    paddingTop: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  letterBox: {
    padding: 22,
    backgroundColor: Colors.cream,
    borderWidth: 1,
    borderColor: Colors.rule,
  },
  openQuote: {
    position: 'absolute',
    top: -2,
    left: 14,
    fontSize: 42,
    fontFamily: 'Fraunces-Light',
    lineHeight: 44,
  },
  letterFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 16,
    paddingTop: 12,
  },
  border: { borderTopWidth: 1, borderTopColor: Colors.rule },
  appreciationBox: {
    paddingLeft: 20,
    borderLeftWidth: 2,
    borderLeftColor: Colors.accent,
  },
  checkinBox: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: Colors.bone,
    borderWidth: 1,
    borderColor: Colors.rule,
  },
  checkinHeader: {
    padding: 12,
    backgroundColor: Colors.cream,
    borderBottomWidth: 1,
    borderBottomColor: Colors.rule,
  },
  checkinField: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.rule,
  },
});