import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Button, RadioButton, Text } from 'react-native-paper';

const BottomDrawer = ({ visible, onClose, onSelectionChange }) => {
	const [selectedValue, setSelectedValue] = React.useState(null);

  const handleSelectionChange = (value) => {
    setSelectedValue(value);
    if (onSelectionChange) {
      onSelectionChange(value);
    }
  };

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
							{/* Drawer content goes here */}
							<Text>Sort by</Text>
							<RadioButton.Group
								onValueChange={(value) => handleSelectionChange(value)}
								value={selectedValue}
							>
								<RadioButton.Item label="Recent" value="posting" />
								<RadioButton.Item label="Distance" value="distance" />
								<RadioButton.Item label="Expiry Time (latest)" value="expiry_latest" />
								<RadioButton.Item label="Expiry Time (earliest)" value="expiry_earliest" />
								<RadioButton.Item label="Price" value="price" />
							</RadioButton.Group>
						</View>
					</View>
				</TouchableOpacity>
			</Modal>

		</View>
  );
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
});

export default BottomDrawer;