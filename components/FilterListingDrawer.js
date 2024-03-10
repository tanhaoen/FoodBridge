import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Button, Chip, List, Text, useTheme } from 'react-native-paper';

const FilterListingDrawer = ({ visible, onClose, onSelectionChange }) => {
  const theme = useTheme();

	const [tempSelectedValues, setTempSelectedValues] = React.useState([]);
  const [selectedValues, setSelectedValues] = React.useState([]);

  const categories = ["Chinese", "Malay", "Indian", "Western", "Korean", "Thai", "Japanese"]

  const handleSelectionChange = (value) => {
    const isSelected = tempSelectedValues.includes(value);
    const updatedValues = isSelected
      ? tempSelectedValues.filter((selectedValue) => selectedValue !== value)
      : [...tempSelectedValues, value];

    setTempSelectedValues(updatedValues);
  };

  const handleSave = () => {
    setSelectedValues([...tempSelectedValues]);

    if (onSelectionChange) {
      onSelectionChange([...tempSelectedValues]);
    }

    onClose(); // Close the modal after saving
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
				onBackdropPress={onClose}
			>
				<TouchableOpacity
					activeOpacity={1}
					style={styles.overlay}
					onPress={onClose}
				>
					<View style={styles.modalContainer}>
						<View style={styles.drawerContainer}>
              <List.Section title="Filter by Cuisine">
                <View style={styles.row}>
                  {categories.map((category, index) => (
                    <Chip
                      key={index}
                      style={[styles.chip,
                        {backgroundColor: tempSelectedValues.includes(category) ? theme.colors.primary : theme.colors.light}
                      ]}
                      textStyle={{
                        color: tempSelectedValues.includes(category) ? "white" : "black",
                      }}
                      selected={tempSelectedValues.includes(category)}
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