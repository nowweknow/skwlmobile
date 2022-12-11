import * as React from 'react';
import {KeyboardAvoidingView, ScrollView, StatusBar, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ScreenProps} from './screen.props';
import {isNonScrolling, offsets, presets} from './screen.presets';
import {isIos} from 'app/helpers';

const ScreenWithoutScrolling = (props: ScreenProps) => {
  const {safePaddingTop = true, safePaddingBottom = true} = props;
  const insets = useSafeAreaInsets();
  const paddingTop = safePaddingTop && {paddingTop: insets.top};
  const paddingBottom = safePaddingBottom && {paddingBottom: insets.bottom};
  const preset = presets.fixed;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor ? {backgroundColor: props.backgroundColor} : {};

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar barStyle={props.statusBar || 'dark-content'} />
      <View style={[preset.inner, style, paddingTop, paddingBottom]}>{props.children}</View>
    </KeyboardAvoidingView>
  );
};

const ScreenWithScrolling = (props: ScreenProps) => {
  const preset = presets.scroll;
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor ? {backgroundColor: props.backgroundColor} : {};
  const {safePaddingTop = true, safePaddingBottom = true} = props;
  const insets = useSafeAreaInsets();
  const paddingTop = safePaddingTop && {paddingTop: insets.top};
  const paddingBottom = safePaddingBottom && {paddingBottom: insets.bottom};

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar barStyle={props.statusBar || 'dark-content'} />
      <View style={[preset.outer, backgroundStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style, paddingTop, paddingBottom]}
          keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || 'handled'}>
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export const Screen = (props: ScreenProps) => {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />;
  } else {
    return <ScreenWithScrolling {...props} />;
  }
};
