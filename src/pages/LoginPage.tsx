import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from 'react-native';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useLoginMutation} from '@/redux/services/auth.service';
import Octicons from 'react-native-vector-icons/Octicons';
// import {useTypedNavigation} from '@/hooks/navigator/typedNavigationHook';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, {message: 'Must be at least 4 characters'}),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, {isLoading}] = useLoginMutation();

  // const navigator = useTypedNavigation();

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: 'customer1@gmail.com',
      password: '12345',
    },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<LoginFormSchema> = async data => {
    console.log(data);
    try {
      await login(data).unwrap();
    } catch (error) {
      console.log(error);
      return;
    }
    form.reset();
  };
  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>Login</Text>
            <Controller
              control={form.control}
              name="email"
              render={({
                field: {onChange, onBlur, value},
                fieldState: {error},
              }) => (
                <React.Fragment>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={isLoading ? false : true}
                  />

                  {error?.message && (
                    <Text style={styles.error_message}>{error.message}</Text>
                  )}
                </React.Fragment>
              )}
            />

            <Controller
              control={form.control}
              name="password"
              render={({
                field: {onChange, onBlur, value},
                fieldState: {error},
              }) => (
                <React.Fragment>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={styles.input}
                      secureTextEntry={!showPassword}
                      placeholder="Password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      editable={isLoading ? false : true}
                    />
                    <Octicons
                      style={styles.eyeIcon}
                      name={showPassword ? 'eye' : 'eye-closed'}
                      size={24}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  </View>
                  {error?.message && (
                    <Text style={styles.error_message}>{error.message}</Text>
                  )}
                </React.Fragment>
              )}
            />
            <Pressable
              disabled={isLoading}
              style={styles.button}
              onPress={form.handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>
                {isLoading ? 'Loading...' : 'Login'}
              </Text>
            </Pressable>

            <Pressable style={styles.forgotPassword}>
              <Text
                style={styles.forgotPasswordText}
                onPress={() => {
                  console.log('forgot password');
                }}>
                Forgot Password?
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: 300,
    marginBottom: 10,
  },

  passwordContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    position: 'relative',
  },
  eyeIcon: {position: 'absolute', right: 20, top: 10},
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 300,
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
  },

  forgotPassword: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black',
    // backgroundColor: 'blue',
  },
  error_message: {
    color: 'red',
  },
});
export default LoginPage;
