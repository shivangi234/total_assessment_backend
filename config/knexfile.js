// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
      client: 'postgresql',
      connection: {
        database: 'total_assessment_backend',
        user:     'postgres',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    },

    student: {
      client: 'postgresql',
      connection: {
        database: 'total_assessment_backend',
        user:     'postgres',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_student_migrations',
        directory: './config/migrations'
      },
    },
    usermaster: {
      client: 'postgresql',
      connection: {
        database: 'total_assessment_backend',
        user:     'postgres',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_usermaster_migrations',
        directory: './config/migrations'
      },
    },
    organizationmaster: {
      client: 'postgresql',
      connection: {
        database: 'total_assessment_backend',
        user:     'postgres',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_organizationmaster_migrations',
        directory: './config/migrations' 
      }
    },
    quizmaster: {
        client: 'postgresql',
        connection: {
          database: 'total_assessment_backend',
          user:     'postgres',
          password: 'password'
        },
        pool: {
          min: 2,
          max: 10
        },
        migrations: {
          tableName: 'knex_quizmaster_migrations',
          directory: './config/migrations' 
        }
    },
    subjectmaster: {
        client: 'postgresql',
        connection: {
          database: 'total_assessment_backend',
          user:     'postgres',
          password: 'password'
        },
        pool: {
          min: 2,
          max: 10
        },
        migrations: {
          tableName: 'knex_subjectmaster_migrations',
          directory: './config/migrations' 
        }
    },
    quiz_mcq : {
        client: 'postgresql',
        connection: {
          database: 'total_assessment_backend',
          user:     'postgres',
          password: 'password'
        },
        pool: {
          min: 2,
          max: 10
        },
        migrations: {
          tableName: 'knex_quiz_mcq _migrations',
          directory: './config/migrations' 
        }
    },
    quiz_answer : {
        client: 'postgresql',
        connection: {
          database: 'total_assessment_backend',
          user:     'postgres',
          password: 'password'
        },
        pool: {
          min: 2,
          max: 10
        },
        migrations: {
          tableName: 'knex_quiz_answer_migrations',
          directory: './config/migrations' 
        }
    },
    quiz_examinee : {
      client: 'postgresql',
      connection: {
        database: 'total_assessment_backend',
        user:     'postgres',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_ quiz_examinee_migrations',
        directory: './config/migrations' 
      }
  },
  quiz_subject : {
    client: 'postgresql',
    connection: {
      database: 'total_assessment_backend',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_quiz_subject_migrations',
      directory: './config/migrations' 
    }
  },
  user_quiz_activity : {
    client: 'postgresql',
    connection: {
      database: 'total_assessment_backend',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_user_quiz_activity_migrations',
      directory: './config/migrations' 
    }
  },
  quiz_subject_selection : {
    client: 'postgresql',
    connection: {
      database: 'total_assessment_backend',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_quiz_subject_selection_migrations',
      directory: './config/migrations' 
    }
  },
  config : {
    client: 'postgresql',
    connection: {
      database: 'total_assessment_backend',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_config_migrations',
      directory: './config/migrations' 
    }
  },







  exam_group : {
    client: 'postgresql',
    connection: {
      database: 'total_assessment_backend',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_exam_group_migrations',
      directory: './config/migrations' 
    }
  },
  exam_subgroup : {
    client: 'postgresql',
    connection: {
      database: 'total_assessment_backend',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_exam_subgroup_migrations',
      directory: './config/migrations' 
    }
  },
  examgroup_organization : {
    client: 'postgresql',
    connection: {
      database: 'total_assessment_backend',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_examgroup_organization_migrations',
      directory: './config/migrations' 
    }
  },
  subject_organization : {
    client: 'postgresql',
    connection: {
      database: 'total_assessment_backend',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_subject_organization_migrations',
      directory: './config/migrations' 
    }
  },
  subject_topic : {
    client: 'postgresql',
    connection: {
      database: 'total_assessment_backend',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_subject_topic_migrations',
      directory: './config/migrations' 
    }
  },
  quiz_subject_details : {
    client: 'postgresql',
    connection: {
      database: 'total_assessment_backend',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_quiz_subject_details_migrations',
      directory: './config/migrations' 
    }
  },
  quiz_examinee_subject : {
    client: 'postgresql',
    connection: {
      database: 'total_assessment_backend',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_quiz_examinee_subject_migrations',
      directory: './config/migrations' 
    }
  },
  org_examinee_category1_master: {
    client: 'postgresql',
    connection: {
      database: 'total_assessment_backend',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_org_examinee_category1_master_migrations',
      directory: './config/migrations' 
    }
  },
  org_examinee_category2_master: {
    client: 'postgresql',
    connection: {
      database: 'total_assessment_backend',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_org_examinee_category2_master_migrations',
      directory: './config/migrations' 
    }
  },
  user_role: {
    client: 'postgresql',
    connection: {
      database: 'total_assessment_backend',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_user_role_migrations',
      directory: './config/migrations' 
    }
  },
  sync_log: {
    client: 'postgresql',
    connection: {
      database: 'total_assessment_backend',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_sync_log_migrations',
      directory: './config/migrations' 
    }
  },
  };