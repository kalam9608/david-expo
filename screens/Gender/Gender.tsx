import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useRouter } from 'expo-router'

import { BackButton } from '@/components/BackButton'
import { BackgroundImageWrapper } from '@/components/BackgroundImageWrapper'
import { ContinueButton } from '@/components/buttons/ContinueButton'
import { PATH } from '@/constants/constants'

export const Gender: React.FC = () => {
    const router = useRouter()
    const [gender, setGender] = useState<String>("")
    const [isGenderSelect, setIsGenderSelect] = useState<boolean>(false)
    const [isMoreView, setIsMoreView] = useState<boolean>(false)




    const handleContinue = async () => {

        router.push(PATH.BASICS_DONE)


    }

    const handleGenderSelect = async (value: String) => {
        setGender(value);
        setIsGenderSelect(true);
    }



    return (
        <BackgroundImageWrapper isNoBg>
            <BackButton isDark />
            <View style={styles.top} />
            <View style={styles.main}>
                <View>
                    <Text style={styles.headline}>What’s your gender?</Text>
                </View>
            </View>

            <View style={styles.between} />

            <View style={[styles.buttonContainer, isMoreView && styles.shadowContainer]}>
                <>
                    <TouchableOpacity
                        style={[styles.genderContainer, gender == "Woman" && styles.genderBorderColor]}
                        onPress={() => handleGenderSelect("Woman")}
                    >
                        <Text style={[styles.text]}>Woman</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.genderContainer, gender == "Man" && styles.genderBorderColor]}
                        onPress={() => handleGenderSelect("Man")}
                    >
                        <Text style={[styles.text]}>Man</Text>
                    </TouchableOpacity>

                    {isMoreView && <><TouchableOpacity
                        style={[styles.genderContainer, gender == "Non-binary" && styles.genderBorderColor]}
                        onPress={() => handleGenderSelect("Non-binary")}
                    >
                        <Text style={[styles.text]}>Non-binary
                        </Text>
                    </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.genderContainer, gender == "Trans Man" && styles.genderBorderColor]}
                            onPress={() => handleGenderSelect("Trans Man")}
                        >
                            <Text style={[styles.text]}>Trans Man
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.genderContainer, gender == "Trans Woman" && styles.genderBorderColor]}
                            onPress={() => handleGenderSelect("Trans Woman")}
                        >
                            <Text style={[styles.text]}>Trans Woman</Text>
                        </TouchableOpacity></>}

                </>

                <TouchableOpacity
                    style={[styles.moreOption]}
                    onPress={() => setIsMoreView(true)}
                >
                    {!isMoreView && <Text style={[styles.moreOptionText]}>More options</Text>}
                </TouchableOpacity>
            </View>

            <View style={styles.between} />
            <View style={[styles.warningBoxStyle]}>
                <Text style={styles.warningTextStyle}>
                    This info. will be displayed on your account and it
                </Text>
                <Text style={styles.warningTextStyle}>
                    couldn&lsquo;t be changed.
                </Text>
            </View>
            <ContinueButton
                disabled={isGenderSelect ? false : true} // Disable button if not selected any gender
                style={styles.continueButton}
                textStyle={styles.continueButtonText}
                title="CONTINUE"
                onPress={(handleContinue)}
            />

            <View style={styles.bottom} />
        </BackgroundImageWrapper>
    )
}

const styles = StyleSheet.create({
    between: {
        flex: 1.5,
        width: '80%',
    },
    bottom: {
        height: 40,
        paddingLeft: 15,
        width: '90%',
    },
    buttonContainer: {
        display: 'flex',
        gap: 16,
        marginBottom: 30,
        width: '80%',
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",

    },

    shadowContainer: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 15,
        shadowColor: '#000',
        shadowOpacity: 0.9,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
    },



    continueButton: {
        width: '80%',
    },
    continueButtonText: {
        color: '#fff',
    },
    headline: {
        color: '#000',
        fontFamily: 'Montserrat-Medium',
        fontSize: 32,
        fontWeight: '600',
        lineHeight: 32,
        textAlign: 'center',
    },

    main: {
        height: '12%',
        width: '80%',
    },
    top: {
        height: '14%',
    },

    genderContainer: {
        alignItems: 'center',
        backgroundColor: "transprant",
        borderRadius: 24,
        width: '90%',
        borderWidth: 1,
        borderColor: "#000000",
        paddingVertical: 16,
        paddingRight: 34,
        paddingLeft: 28
    },
    genderBorderColor: {
        borderColor: "#3F86FF",
    },
    text: {
        color: 'rgba(0, 0, 0, 1)',
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        lineHeight: 19.5,
    },
    moreOption: {
        alignItems: 'center',
    },
    moreOptionText: {
        color: '#3F86FF',
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        lineHeight: 19.5,
        fontWeight: '600',
    },

    warningBoxStyle: {
        alignItems: 'center',
        backgroundColor: "transprant",
        width: '90%',
        marginBottom: 12,
        paddingHorizontal: 10
    },
    warningTextStyle: {
        color: '#A1A1A1',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        lineHeight: 15.85,
        fontWeight: '500',
    }


})
