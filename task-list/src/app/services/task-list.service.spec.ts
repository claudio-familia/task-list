import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { TaskListService } from './task-list.service';
import { HttpClient } from '@angular/common/http';
import { MOCK_TASKLIST } from "src/app/shared/testing/task-list.service.mock";
import { Tasklist } from '../models/tasklist.interface';
import { of } from 'rxjs';

describe('TaskListService', () => {
  let service: TaskListService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskListService],
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskListService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the list of todos different from null or empty array', (done) => {
    const response: Tasklist[] = [...MOCK_TASKLIST.todos];
    spyOn(http, 'get').and.returnValue(of(response));

    service.getAll().subscribe((response) => {
      expect(response).not.toBeNull();
      expect(response.length).toBeGreaterThan(0);
      done();
    });
  });
  it('should get a todo by ID', (done) => {
    const response: Tasklist = {...MOCK_TASKLIST.todos[0]};
    spyOn(http, 'get').and.returnValue(of(response));

    service.getById(2).subscribe((response) => {
      expect(response).not.toBeNull();
      expect(response.id).toBe(2);
      done();
    });
  });
  it('should create a todo', (done) => {
    const payload: any = {
      title: "Wipe the mirrows",
      description: ""
    };
    spyOn(http, 'post').and.returnValue(of({...payload, id: 25}));

    service.create(payload).subscribe((response) => {
      expect(response).not.toBeNull();
      expect(response.title).toBe(payload.title);
      expect(response.id).toBeGreaterThan(0);
      done();
    });
  });
  it('should update a todo', (done) => {
    const payload: Tasklist = {
      id: 17,
      title: "Add documentation and testing",
      description: "",
      isCompleted: false,
      completedAt: null
    };
    spyOn(http, 'put').and.returnValue(of(payload));

    service.update(payload).subscribe((response) => {
      expect(response).not.toBeNull();
      expect(response.title).toBe(payload.title);
      expect(response.description).toBe(payload.description);
      expect(response.id).toBe(17);
      done();
    });
  });
  it('should delete a todo by ID', (done) => {
    const response: Tasklist = {...MOCK_TASKLIST.todos[0]};
    spyOn(http, 'delete').and.returnValue(of(response));

    service.delete(2).subscribe((response) => {
      expect(response).not.toBeNull();
      expect(response.id).toBe(2);
      done();
    });
  });
});
