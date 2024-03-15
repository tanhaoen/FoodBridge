import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Chip, List, Text, useTheme } from 'react-native-paper';

const FilterListingDrawer = ({ visible, onClose, onSelectionChange }) => {
  const theme = useTheme();

	const [initialValues, setInitialValues] = React.useState([]);
  const [selectedValues, setSelectedValues] = React.useState([]);

  const categories = ["Chinese", "Malay", "Indian", "Western", "Korean", "Thai", "Japanese"]

  const handleSelectionChange = (value) => {
    const isSelected = selectedValues.includes(value);
    const updatedValues = isSelected
      ? selectedValues.filter((selectedValue) => selectedValue !== value)
      : [...selectedValues, value];

    setSelectedValues(updatedValues);
  };

  const handleBackgroundClose = () => {
    setSelectedValues(initialValues);
    onClose();
  }

  const handleSave = () => {
    setInitialValues(selectedValues);
    onSelectionChange(selectedValues);
    onClose();
  };

  const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    drawerContainer: {
      backgroundColor: 'white',
      padding: 16,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      width: '100%',
    },
    row : {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      flexWrap: 'wrap'
    },
    chip: {
      marginRight: 8,
      marginTop: 10,
      backgroundColor: theme.colors.light
    },
  });

  return (
    <View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={visible}
				onBackdropPress={handleBackgroundClose}
			>
				<TouchableOpacity
					activeOpacity={1}
					style={styles.overlay}
					onPress={handleBackgroundClose}
				>
					<View style={styles.modalContainer}>
						<View style={styles.drawerContainer}>
              <List.Section title="Filter by Cuisine">
                <View style={styles.row}>
                  {categories.map((category, index) => (
                    <Chip
                      key={index}
                      style={[styles.chip,
                        {backgroundColor: selectedValues.includes(category) ? theme.colors.primary : theme.colors.light}
                      ]}
                      textStyle={{
                        color: selectedValues.includes(category) ? "white" : "black",
                      }}
                      onPress={() => handleSelectionChange(category)}
                      showSelectedCheck={false}
                    >
                      {category}
                    </Chip>
                  ))}
                </View>
              </List.Section>

              <Button
                buttonColor={theme.colors.primary}
                textColor={theme.colors.background}
                uppercase
                onPress={handleSave}
              >
                Save
              </Button>
						</View>
					</View>
				</TouchableOpacity>
			</Modal>

		</View>
  );
};

export default FilterListingDrawer;