import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Switch, Alert } from 'react-native';

export default function App() {
  const [user, setUser] = useState({
    name: 'Phu Le',
    age: 21,
  });

  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isImportant, setIsImportant] = useState(false);
  const [filter, setFilter] = useState('all');

  const [todos, setTodos] = useState([
    { id: '1', text: 'Học React Native', completed: false, priority: 'high', important: true },
    { id: '2', text: 'Hoàn thành bài tập', completed: true, priority: 'medium', important: false },
    { id: '3', text: 'Đọc tài liệu', completed: false, priority: 'low', important: false },
    { id: '4', text: 'Tập gym', completed: false, priority: 'medium', important: true },
  ]);

  const addTodo = () => {
    if (newTask.trim() === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung công việc');
      return;
    }

    const newTodoItem = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
      priority,
      important: isImportant
    };

    setTodos([...todos, newTodoItem]);
    setNewTask('');
    setPriority('medium');
    setIsImportant(false);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const renderItem = ({ item }) => (
    <View style={[styles.todoItem, item.completed && styles.completedTodo]}>
      <TouchableOpacity style={styles.checkbox} onPress={() => toggleComplete(item.id)}>
        {item.completed && <View style={styles.checkboxInner} />}
      </TouchableOpacity>
      
      <View style={styles.todoTextContainer}>
        <Text style={[
          styles.todoText, 
          item.completed && styles.completedText,
          item.important && styles.importantText
        ]}>
          {item.text}
        </Text>
        
        <View style={[
          styles.priorityBadge, 
          item.priority === 'high' ? styles.highPriority : 
          item.priority === 'medium' ? styles.mediumPriority : 
          styles.lowPriority
        ]}>
          <Text style={styles.priorityText}>
            {item.priority === 'high' ? 'Cao' : 
            item.priority === 'medium' ? 'Trung bình' : 'Thấp'}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity onPress={() => deleteTodo(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.main1}>TO DO LIST</Text>
      <Text style={styles.header}>Xin chào {user.name}!</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Thêm công việc mới..."
          value={newTask}
          onChangeText={setNewTask}
        />
        
        <View style={styles.optionsContainer}>
          <Text style={styles.optionLabel}>Độ ưu tiên:</Text>
          <View style={styles.priorityOptions}>
            {['low', 'medium', 'high'].map(option => (
              <TouchableOpacity 
                key={option}
                style={[styles.priorityOption, priority === option && styles.selectedOption]}
                onPress={() => setPriority(option)}
              >
                <Text style={styles.priorityOptionText}>
                  {option === 'low' ? 'Thấp' : option === 'medium' ? 'Trung bình' : 'Cao'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.switchContainer}>
            <Text style={styles.optionLabel}>Quan trọng:</Text>
            <Switch
              value={isImportant}
              onValueChange={setIsImportant}
              trackColor={{ false: "#767577", true: "#81d4fa" }}
              thumbColor={isImportant ? "#0288d1" : "#f4f3f4"}
            />
          </View>
        </View>
        
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Thêm Công Việc</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Text style={styles.filterText}>Tất cả</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'active' && styles.activeFilter]}
          onPress={() => setFilter('active')}
        >
          <Text style={styles.filterText}>Đang làm</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
          onPress={() => setFilter('completed')}
        >
          <Text style={styles.filterText}>Hoàn thành</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredTodos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.todoList}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  main1: {
    color: "#2196f3",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    color: '#555',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  optionsContainer: {
    marginBottom: 12,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#555',
  },
  priorityOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priorityOption: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 4,
    borderRadius: 4,
  },
  selectedOption: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  priorityOptionText: {
    fontWeight: '500',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#2196f3',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  filterButton: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeFilter: {
    borderBottomColor: '#2196f3',
  },
  filterText: {
    fontWeight: '500',
  },
  todoList: {
    flex: 1,
  },
  todoItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  completedTodo: {
    opacity: 0.7,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2196f3',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2196f3',
  },
  todoTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoText: {
    fontSize: 16,
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  importantText: {
    fontWeight: 'bold',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  highPriority: {
    backgroundColor: '#ffcdd2',
  },
  mediumPriority: {
    backgroundColor: '#fff9c4',
  },
  lowPriority: {
    backgroundColor: '#c8e6c9',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginLeft: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#f44336',
    fontWeight: 'bold',
  },
});